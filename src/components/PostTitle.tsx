interface PostTitleProps {
    title: string;
}

const PostTitle: React.FC<PostTitleProps> = ({title}) => {
    return(
        <h1 className="font-bold text-[40px]">
            {title}
        </h1>
    );
}

export default PostTitle;