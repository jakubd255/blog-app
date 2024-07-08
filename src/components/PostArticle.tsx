interface PostArticleProps {
    text: string;
}

const PostArticle: React.FC<PostArticleProps> = ({text}) => {
    return(
        <article className="post-article" dangerouslySetInnerHTML={{__html: text}}>
        </article>
    )
}

export default PostArticle;