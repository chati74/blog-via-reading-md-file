import path from 'path';
import fs from 'fs';
import process from "process";
import {remark} from "remark";
import html from 'remark-html';

const Posts = ({remarkedContent}) => {
    return(
        <>
            <div dangerouslySetInnerHTML={{__html: remarkedContent.title}}></div>
            <div dangerouslySetInnerHTML={{__html: remarkedContent.author}}></div>
            <div dangerouslySetInnerHTML={{__html: remarkedContent.body}}></div>
        </>
    )
}

export async function getStaticProps() {
    const postDir = path.join(process.cwd(), 'public/posts/post1');
    const title = fs.readFileSync(postDir+'/title.md', "utf-8");
    const processedTitle = await remark().use(html).process(title);
    const remarkedTitle = processedTitle.toString();
    const author = fs.readFileSync(postDir+'/author.md', "utf-8");
    const processedAuthor = await remark().use(html).process(author);
    const remarkedAuthor = processedAuthor.toString();
    const body = fs.readFileSync(postDir+'/body.md', "utf-8");
    const processedBody = await remark().use(html).process(body);
    const remarkedBody = processedBody.toString();
    const content ={
        title:remarkedTitle,
        author:remarkedAuthor,
        body:remarkedBody,
    }
    return{
        props:{
            remarkedContent:content,
        },
    };
}

export default Posts;