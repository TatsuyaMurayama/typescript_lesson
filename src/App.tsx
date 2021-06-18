import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ShorthandPropertyAssignment } from 'typescript';

//JSONの型推論
import Data from "./data.json";
import TestCompornent from './TestCompornent';
//typeofによる型継承を既存のJSONファイルに適用することで簡単に型を定義できる
type USERS = typeof Data;


const name = "hello"; //型が"hello"になっている=リテラル型=>文字列リテラル
const name4: string = "hello";
let name2 = "hello";

let username = "Hello"; //型推論でStringと推定されている
let username2: string = "Hello"; // 明示的に型を指定する方法=annotation

let dummyNum: number = 2;

let test = true;
let test2: boolean = true;

let array = [true, true, false];
let array2: boolean[] = [true, true, false];
let array3 = [0,2,"3"];
let array4: (string | number)[] = [0,2,"3"];

//オブジェクトの型の定義の仕方    interface=>オブジェクト
interface NAME {
  first: string | null;
  last?: string; // ?を定義の後につけるとnullでもOKになる
}
let nameObj: NAME = {first: null}; //本来はfirstとlastの２つが必須
      //オブジェクトで作った型を用いて変数を作れる
      //nullを指定する場合はオブジェクトの型の指定でしておく


//関数の書き方
const func1 = (x:number, y:number): number => {
  return x+y;
}       //引数それぞれにも型を指定できるが、func1自体の返り値の型も指定できる



//Intersection Types
  //複数のTypeを結合する処理
type PROFILE ={
  age:number;
  city:string;
};
type LOGIN ={
  username:string;
  password:string;
};
type USER = PROFILE & LOGIN; //２つの定義したオブジェクトの型を結合

const userA: USER ={
  age:30,
  city:"Tokyo",
  username: "xxx",
  password: "yyy"
}


//Union Types  変数が受け取れる型を制限するときに使う
let value: boolean | string
value = true;
value = "hello";

//配列の要素に対してもUnion Typesを使うことができる
let arrayUni: (number | string )[];
arrayUni = [0, 2, 4, "hello"];

//リテラル(Literal)とUnion Types の組み合わせ
let company: "FaceBook" | "Google" | "Amazon";
company = "Amazon";

let memory : 245 | 431;
memory = 245;

//typof 既に記載した型定義を継承することができる
let msg: string = "Hi";
let msg2: typeof msg;

let animal = { cat: "small cat"};
let newAnimal : typeof animal = {cat: "big cat"};
        //これを使えば複数の同じ様な型を都度都度設定する必要がなく、１度でできる。


//keyof
type KEYS = {
  primary: string;
  secondary: string;
};
let key: keyof KEYS
key = "primary";   //KEYSで指定されたKeyしか入力できない

//typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball", 
};

let keySports: keyof typeof SPORTS; //typeofで指定された引数における、keyofで指定されたkeyの中の値しか入力できない
keySports = "soccer";

//ERROR
//let keySports2: keyof SPORTS;
//SPORTはconstで定義された関数であり、型ではないので使えない。そのため、型として取り出すためにtypeofがいる


//enum(列挙型) 自動的に連番をつけてくれる
enum OS{
  Windows,
  Mac,
  Linux,
}
interface PC {
  id: number,
  OSType: OS;
}
const PC1: PC = {
  id:1,
  OSType:OS.Windows,
}
const PC2: PC ={
  id: 2,
  OSType:OS.Mac
}

//型の互換性
const comp1 = "test";
let comp2: string = comp1; //string の中に文字列リテラルをいれるのはOK

let comp3: string = "test";
//ERROR
//let comp4: "test" = comp3;
//同じ"test"でもStringという抽象度からくるものには入れられない

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};
//データ型が異なるため、同じ引数の値でも代入はできない
//funcComp1 = funcComp2



//Generics ジェネリクス
//propsで使われる
interface GEN<T>{
  item: T;
}
const gen0: GEN<string> = {item: "hello"};
    //interfaceによって用いる属性だけ、テンプレートの様に用意し、型を後で決めることができる
//const gen1: GEN = { item: "hello"}; 
    //型を指定しないとエラーになる
const gen2: GEN<number> = { item: 12};


//defaultの型を指定することができる
interface GEN1<T = string>{
item: T;
}
const gen3: GEN1 = {item: "hello"};
    //この様にdefaultを指定することで、型指定なしで作ることができる

//extendsによる型制限
interface GEN2<T extends string | number>{
  item: T;
} 
const gen4: GEN2<string> ={item: "hello"};
const gen5: GEN2<number> ={item: 23};
    //const gen6: GEN2<boolean> ={item: true};
    //extendsで指定した制限以外なので使えない

function funcGen<T>(props: T){
  return {item: props}
}
const gen6 = funcGen<string>("test");
const gen7 = funcGen<string | null >(null);

function funcGen1<T extends string | null>(props:T){
  return {value: props};
}
const gen8 = funcGen1("hello");
const gen9 = funcGen1(null);
//extendsで指定した型以外を関数に入れられない
//const gen10 = funcGen1(12);

//propsの使い方
interface Props{
  price: number;
}
function funcGen3<T extends Props>(props: T){
  return {value: props.price};
}
const gen10 = funcGen3({ price: 10});

const funcGen4 = <T extends Props>(props: T) => {
  return {value: props.price};
}

//FC:Functional Compornent 関数コンポーネント
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestCompornent text = "hello from App"/>
      </header>
    </div>
  );
}
export default App;




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>
//   );
// }

// export default App;
