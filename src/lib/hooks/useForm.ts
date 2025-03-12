import { useState } from "react";

export default function useForm(init: string) {
    const [value, setValue] = useState<string>(init);
    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    return [value, setValue, handleUpdate];
}