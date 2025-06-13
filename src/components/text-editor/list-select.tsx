import { type Editor } from "@tiptap/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { List, ListOrdered, ListTodo } from "lucide-react";

interface ListSelectProps {
    editor: Editor;
}

export default function ListSelect({editor}: ListSelectProps) {
    const lists = [
        {
            key: "bulletList",
            label: "Bullet list",
            icon: <List className="w-4 h-4"/>
        },
        {
            key: "orderedList",
            label: "Ordered list",
            icon: <ListOrdered className="w-4 h-4"/>
        },
        {
            key: "taskList",
            label: "Task list",
            icon: <ListTodo className="w-4 h-4"/>
        }
    ]

    const getValue = () => {
        return lists
            .map(list => list.label.toLowerCase())
            .find(list => editor.isActive(list));
    }
    const value = getValue();

    const onValueChange = (value: string) => {
        switch(value) {
            case "bulletList": editor.chain().focus().toggleBulletList().run(); break;
            case "orderedList": editor.chain().focus().toggleOrderedList().run(); break;
            case "taskList": editor.chain().focus().toggleTaskList().run(); break;
        }
    }

    return(
        <Select 
            value={value} 
            onValueChange={onValueChange}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <SelectTrigger className="w-[60px]">
                        {lists.find(list => list.key === value)?.icon ?? lists[0].icon}
                        </SelectTrigger>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    List
                </TooltipContent>
            </Tooltip>
            <SelectContent>
                {lists.map(list => (
                    <SelectItem value={list.key} key={list.key}>
                        <div className="flex items-center gap-2">
                            {list.icon}
                            {list.label}
                        </div>
                    </SelectItem>
                ))}
                {/*<SelectItem value="bulletList">
                    <div className="flex items-center">
                        <List className="w-4 h-4 mr-2"/>
                        Bullet list
                    </div>
                </SelectItem>
                <SelectItem value="orderedList">
                    <div className="flex items-center">
                        <ListOrdered className="w-4 h-4 mr-2"/>
                        Ordered list
                    </div>
                </SelectItem>
                <SelectItem value="taskList">
                    <div className="flex items-center">
                        <ListTodo className="w-4 h-4 mr-2"/>
                        Task list
                    </div>
                </SelectItem>*/}
            </SelectContent>
        </Select>
    )
}