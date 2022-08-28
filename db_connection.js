const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');

config = {
    aws_table_name: 'workoutLog',
    aws_remote_config: {

        accessKeyId: 'AKIA5KHRTHYYMBRC4BQN',
        secretAccessKey: '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',
        region: 'us-east-2',
    }
};

// const getRecords = function (req, res) {
//     AWS.config.update(config.aws_remote_config);

//     const docClient = new AWS.DynamoDB.DocumentClient();

//     const params = {
//         TableName: config.aws_table_name
//     };

//     docClient.scan(params, function (err, data) {
//         if (err) {
//             console.log(err)
//         } else {
//             const { Items } = data;
//             res.send(JSON.stringify(Items))
//         }
//     });
// }


const getRecords = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    // const params = {
    //     ExpressionAttributeValues: {
            
    //         ":encryptedUserId": {
    //             S: req.query.encryptedUserId
    //         }
    //     },
    //     KeyConditionExpression: "encryptedUserId = :encryptedUserId",
    //     ProjectionExpression: "muscleGroup, #s, #d, reps, exercise, weight",
    //     ExpressionAttributeNames: {'#s': 'sets', '#d': 'date'},
    //     TableName: config.aws_table_name
    // };
    // docClient.scan(params, function (err, data) {
    //     if (err) { //an error occurred
    //         console.log(err)
    //     } else {
    //         console.log(data)
    //     }
    // });
    console.log(req.query.encryptedUserId);
    const params = {   
        TableName: config.aws_table_name,
        FilterExpression : "encryptedUserId = :encryptedUserId",
         ExpressionAttributeValues: {
            
            ":encryptedUserId": req.query.encryptedUserId
         },
      };
      
      var documentClient = new AWS.DynamoDB.DocumentClient();
      
      documentClient.scan(params, function(err, data) {
         if (err) console.log(err);
         else {
            console.log(data);
             res.send(JSON.stringify(data.Items))
         }
      });
}

const addRecord = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.Id = uuidv1();
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(JSON.stringify(Item))
        }
    });
}

const updateRecord = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to update the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send('record updated')
        }
    });
}

const deleteRecord = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const id = req.query.id;
    var params = {
        TableName: config.aws_table_name,
        Key: {
            "Id": id,
        },
    };

    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            res.send("delete successful")
        }
    });
}

module.exports = {
    getRecords,
    addRecord,
    updateRecord,
    deleteRecord
}

