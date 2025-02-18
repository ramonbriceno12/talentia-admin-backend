const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const OpenAI = require('openai')

require('dotenv').config();

// Configure AWS Textract
const textract = new AWS.Textract({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const openai = new OpenAI();


// Function to process the file
async function processFile(url) {
    try {
        console.log("Downloading file...");

        // Download file from URL
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer'
        });

        const filePath = `./temp-${uuidv4()}.pdf`;
        fs.writeFileSync(filePath, response.data);

        console.log("File downloaded. Sending to AWS Textract...");

        // Read file buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Send file to AWS Textract
        const textractParams = {
            Document: { Bytes: fileBuffer },
            FeatureTypes: ['TABLES', 'FORMS']
        };

        const textractResponse = await textract.analyzeDocument(textractParams).promise();

        // Extract text from Textract response
        const extractedText = textractResponse.Blocks
            .filter(block => block.BlockType === 'LINE')
            .map(block => block.Text)
            .join(' ');

        console.log("Text extracted. Sending to OpenAI...");
        console.log(extractedText)

        try {
            fs.unlinkSync(filePath);
            console.log("Temporary file deleted.");
        } catch (deleteError) {
            console.error("Error deleting file:", deleteError);
        }

        // // Send extracted text to OpenAI GPT API
        try {
            // const openAiResponse = await axios.post(
            //     'https://api.openai.com/v1/chat/completions',
            //     {
            //         model: 'gpt-4',
            //         messages: [{ role: 'user', content: extractedText }]
            //     },
            //     {
            //         headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
            //     }
            // );
            const stream = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: "Say this is a test" }],
                store: true,
                stream: true,
            });
            for await (const chunk of stream) {
                process.stdout.write(chunk.choices[0]?.delta?.content || "");
            }
    
            console.log("OpenAI response received:", openAiResponse.data.choices[0].message.content);
        } catch (error) {
            console.log(error)
        }
        

        // // Cleanup temp file
        // fs.unlinkSync(filePath);

        // return openAiResponse.data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example Usage:
processFile("https://talentiafilesprod.s3.us-east-2.amazonaws.com/talentiafilesprod/resumes/1739837365225-inbound1123142592529573993.pdf")
    .then(response => console.log("Final Processed Output:", response));
