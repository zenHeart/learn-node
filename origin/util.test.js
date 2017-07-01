/**
 * Created by lockepc on 2017/6/2.
 */
var util =require('util');


function Person(name,age) {
    this.name = age;
    this.age = name;

    this.personInfo = function () {
        console.log(`age:${age},name:${name}`);
    };

    return this;
}

function Student(name,age,school) {
    this.school = school;
    Person.call(this,name,age);
    this.studentInfo = function () {
        console.log(`age:${age},name:${name},school:${school}`);
    };

    return this;
}

//util 做了两件事
//1. Student.prototype = Object.create(Test.prototype);
//2. Student.constructor = Student;
util.inherits(Student,Person);

var locke = new Student('locke',26,'test');
var testRef = Student.prototype;

var instantRef = new testRef('testRef',12,'ref');

console.log(instantRef);

console.log(locke);

locke.studentInfo();
locke.personInfo();


