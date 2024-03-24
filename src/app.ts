import express from "express";

export class App {
  public server: express.Application;

  constructor(){
    this.server = express()
    this.middleware()
  }

  private middleware(){
    this.server.use(express.json())
  }
}