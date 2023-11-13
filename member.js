function skillsMember() {
    var member = new Member();
    member.name = "John";
    member.skills.push("C#");
    member.skills.push("JavaScript");
    member.skills.push("SQL");
    member.skills.push("HTML");
    member.skills.push("CSS");
    member.skills.push("Java");
    member.skills.push("C++");
    member.skills.push("Python");
    member.skills.push("PHP");
    member.skills.push("Ruby");

    member.skills.sort();
    member.skills.reverse();

    console.log(member.skills);
}