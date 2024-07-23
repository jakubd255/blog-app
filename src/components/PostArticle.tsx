interface PostArticleProps {
    text: string;
}

const PostArticle: React.FC<PostArticleProps> = ({text}) => {
    return(
        <div className="flex flex-wrap">
            <article className="post-article" dangerouslySetInnerHTML={{__html: text}}>
            </article>
        </div>
    )
}

export default PostArticle;