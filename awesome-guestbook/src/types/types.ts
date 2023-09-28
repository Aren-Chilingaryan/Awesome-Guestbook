export type Visitor = {
    id: string;
    visitor: string;
    email: string;
    department: string;
};

export type SetStringState = React.Dispatch<React.SetStateAction<string>>;

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
