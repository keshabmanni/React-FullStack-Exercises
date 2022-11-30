// import { useState } from "react";


const App = () => {  // function App(){ return(<tags>)}
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of component',
        exercises: 14
      }
    ]
  }

  return (
    <div className="App">

      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = ({course_name}) => <h1>{course_name}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {
      parts.map((part,index) => <Part key={index} part={part.name} exercise={part.exercises}/>
      )
      }
    </div>
  )
}

const Part = (props) => <p>{props.part} : {props.exercise}</p>

const Total = ({parts}) => {
  let total = 0;
  parts.forEach(part => total+=part.exercises);
  return (
    <p>Total Number of exercises : {total}</p>
  )
}

export default (App);
