//raと入力すると、rafceが出てきて、アロー関数の関数コンポーネントのテンプレートを出せる

import React, { useState } from 'react'

interface Props {
    text: string;
}

interface UserData {
    id:number;
    name:string;
}

const TestCompornent:React.FC<Props> = (props) => {
    const [count, setCount] = useState<number | null>(null);
    const [user, setUser] = useState<UserData>({id: 1, name: "dummy"});
    const [inputData, setInputData] = useState("");

    const handleInputCange = (e: React.ChangeEvent<HTMLInputElement>)=>
    setInputData(e.target.value);

    return (
        <div>
            <h1>{props.text}</h1>
            <h1>{count}</h1>
            <input type="text" value={inputData} onChange={handleInputCange} />
            <h1>{inputData}</h1>
        </div>
    )
}

export default TestCompornent

