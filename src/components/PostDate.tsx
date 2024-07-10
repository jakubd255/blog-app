import dayjs from "dayjs";



interface PostDateProps {
    date: string;
}

const PostDate: React.FC<PostDateProps> = ({date}) => {
    const formattedDate = dayjs(date).format("D.MM.YYYY");

    return(
        <span className="text-muted-foreground !w-[200px]">
            {formattedDate}
        </span>
    );
}

export default PostDate;