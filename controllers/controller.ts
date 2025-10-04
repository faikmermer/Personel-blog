import { Request, Response } from 'express';
import fs from 'fs';
import { infoPost } from '../types';

async function getHomePage(req : Request, res: Response){
    
    const data = await fs.promises.readFile('data/articles.json', 'utf-8');
        
    const articles = JSON.parse(data) as infoPost[];

    res.render("home", {articles});
}

async function getArticlePage(req : Request, res: Response){
    
    const id = req.params.id;
    const data = await fs.promises.readFile('data/articles.json', 'utf-8');
    
    const articles = JSON.parse(data);
    const article = articles.find((a : infoPost) => a.id === parseInt(id));

    if(article){
        res.render("article", {article});
    }else{
        res.status(404).send("Article not found");
    }
}

function getLoginPage(req : Request, res: Response){
    res.render("login");
}

function postLogin(req : Request, res: Response){
    
    const {password, username} = req.body;

    if(password === "1234" && username === "admin"){
        res.cookie('password', password, { maxAge: 60 * 1000, httpOnly: true });
        res.cookie('username', username, { maxAge: 60 * 1000, httpOnly: true });
        res.redirect('/admin/dashboard');
    }else{
        
        res.redirect('/login');
    }

}

async function getDashboardPage(req : Request, res: Response){


    const data = await fs.promises.readFile('data/articles.json', 'utf-8');
    let articles : infoPost[] = [];
    if(data.length > 0){
        articles = JSON.parse(data) as infoPost[];
        res.render("dashboard", {articles});
    }else{
        res.render("dashboard", {articles : []});
    }

}

async function getAddArticlePage(req : Request, res: Response){
    const data = await fs.promises.readFile('data/articles.json', 'utf-8');
    let articles : infoPost [] = [];
    if(data.length > 0) {
        articles = JSON.parse(data) as infoPost[];
        res.render("add-article", {articles});
    }else{
        res.render("add-article", {articles : []});
    }
    
}

async function postAddArticle(req : Request, res: Response){
    try{
        const {title , content } = req.body;

        const data = await fs.promises.readFile('data/articles.json', 'utf-8');
        const articles = JSON.parse(data);

        const date = new Date().toISOString();
    
        const newArticle : infoPost = {
            id : articles.length + 1,
            title : title,
            content : content,
            date : date
        };

        articles.push(newArticle);
        const strData = JSON.stringify(articles, null, 2);
        await fs.promises.writeFile('data/articles.json', strData);
        res.redirect('/admin/dashboard');

    }catch (error) {
        console.error("Error adding article:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getEditArticle(req : Request, res: Response){
    
    const id = req.params.id;

    const data = await fs.promises.readFile( 'data/articles.json', 'utf-8');
    const articles = JSON.parse(data) as infoPost[];

    const article = articles.find((a : infoPost) => a.id === parseInt(id));
    if(!article){
        res.status(404).send("You are not allowed to edit this article. Article not found");
    }
    res.render("edit-article", {article});
}

async function postEditArticle(req : Request, res: Response){
    debugger;
    try{
        const id = req.params.id;
        const {title , content} = req.body;
        const data = await fs.promises.readFile( 'data/articles.json', 'utf-8');
        const articles = JSON.parse(data) as infoPost[];
        console.log(title);
        console.log(content);

        for(const article of articles) {
            if(article.id === parseInt(id)){
                article.title = title;
                article.content = content;
                break;
            }
        }
        const strData = JSON.stringify(articles, null, 2);
        await fs.promises.writeFile( 'data/articles.json', strData);
        res.redirect('/admin/dashboard');
    }catch (error) {
        console.error("Error editing article:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function postDeleteArticle(req : Request, res: Response){
    try{
        const id = req.params.id;
        const data = await fs.promises.readFile( 'data/articles.json', 'utf-8');
        const articles = JSON.parse(data) as infoPost[];

        for(const article of articles) {
            if(article.id === parseInt(id)){
                const index = articles.indexOf(article);
                articles.splice(index, 1);
                break;
            }
        }

        const strData = JSON.stringify(articles, null, 2);
        await fs.promises.writeFile( 'data/articles.json', strData)
    
    }catch(error){
        console.error("Error deleting article:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getDeleteArticle(req : Request, res: Response){
    
    try{
        postDeleteArticle(req, res);
        res.send(`
            <h2 style="color: green; font-family: Arial, Helvetica, sans-serif;">Article deleted successfully</h2>    
            <a href="/admin/dashboard">Back to dashboard</a>
        `);
    }catch(error){
        console.error("Error deleting article:", error);
        res.status(500).send("Internal Server Error");
    }

}

export {getHomePage, getArticlePage, getLoginPage, postLogin, 
       getDashboardPage, getAddArticlePage, postAddArticle, getEditArticle, 
       postEditArticle, postDeleteArticle, getDeleteArticle};