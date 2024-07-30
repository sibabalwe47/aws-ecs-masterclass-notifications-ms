import * as DynamoDBProvider from "../libs/dynamodb/index.js";
import * as Logger from "../utils/logger.js";


const createTodo = async (req, res) => {
  try {

    const { userId } = req.body;

    const result = await DynamoDBProvider.putItemHandler(req.body);

    Logger.writeLog({
      url: req.url,
      body: req.body,
      result: result,
    });

    res.status(200).json({
      message: "Session stored successfully!",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await DynamoDBProvider.getItemHandler(
      userId
    );

    Logger.writeLog({
      url: req.url,
      result: "OK",
      session: removeExistingSessions,
    });

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const getTodoByID = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const result = await DynamoDBProvider.getItemHandler(
      id, userId
    );

    Logger.writeLog({
      url: req.url,
      result: "OK",
      session: removeExistingSessions,
    });

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const result = await DynamoDBProvider.remoteItemHandler(
      id, userId
    );

    Logger.writeLog({
      url: req.url,
      result: "OK",
      session: removeExistingSessions,
    });

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const deleteTodoByID = async (req, res) => {
  try {
    const { id, userId } = req.body;

    const result = await DynamoDBProvider.remoteItemHandler(
      id, userId
    );

    Logger.writeLog({
      url: req.url,
      result: "OK",
      session: removeExistingSessions,
    });

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const healthCheck = async(req, res) => {
  Logger.writeLog({
    url: req.url,
    result: "OK",
    msg: "Middleware service is healthy",
  });
  res.status(200).json({
    message: "OK",
  });
}


export default {
  createTodo,
  getTodos,
  getTodoByID,
  updateTodo,
  deleteTodoByID,
  healthCheck
};
