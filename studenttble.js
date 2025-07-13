let students =[];
let edit = null;
const form = document.getElementById("formHeandle");
const tablees = document.getElementById("stuTableBody");
//GETITEM FROM LOCALSTORAGE
const saved = localStorage.getItem("students");
if(saved)
{
    students = JSON.parse(saved);
    renderFilteredTable();
}
//SEARCH
function filterStudents(query){
    const filtered = students.filter(student =>
    student.name.toLowerCase().includes(query.toLowerCase())|| student.roll.includes(query)
);
    renderFilteredTable(filtered)
}
// PUSH DATA TO TABLE
function renderFilteredTable(filteredList=students){
    tablees.innerHTML ="";
    filteredList.forEach((a,b)=>{
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${b+1}</td>
    <td>${a.name}</td>
    <td>${a.roll}</td>
    <td>${a.class}</td>
    <td>${a.phone}</td>
    <td>${a.address}</td>
    <td>
    <button onclick="editStudent(${b})">Edit</button>
    <button onclick= "deleteStudent(${b})">Delete</button>
    </td>
    `;
    tablees.appendChild(row)
 })
}
    document.getElementById("searchInput").addEventListener("input",function(e){
    const query = e.target.value.trim();
if(query === ""){
    renderFilteredTable( )
}
else{
    filterStudents(query)
}
})
// capitalize first word
function capitalizeWords(str){
    return str
    .split(" ")
    .filter(word =>word)
    .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(" ")
}
// form heandling
form.addEventListener("submit",function (e)
{
        e.preventDefault();
        // generate roll no
        let roll 
        if(edit === null){
            let isDuplicate = true;
            while(isDuplicate){
                roll = Math.floor(100000 +Math.random() * 900000).toString();
                isDuplicate = students.some(student => student.roll === roll);
            }
            document.getElementById("rollno").value = roll;
        }
        let name = document.getElementById("name").value.trim();
        //let roll = document.getElementById("rollno").value.trim();
        let sclass = document.getElementById("class").value.trim();
        let addr = document.getElementById("address").value.trim();
        let phone = document.getElementById("mobile").value.trim();
        if(!name || !roll || !sclass ||!phone || !addr ){
            alert("all fields are required.")
            return;
        }
    name = capitalizeWords(name);
    addr = capitalizeWords(addr)  
    const studata = {name,roll,class:sclass,phone,address:addr}
    if(edit !== null){
        students.splice(edit,1,studata)
        edit = null;
    }
    else{
    students.push(studata);
    }
    if(!sclass){
        alert("Please select a class");
        return;
    }
    if(!/^\d{10}$/.test(phone)){
        alert("Mobile number is 10 digits or enter valied number" );
        return;
    }
    //LOCAL STORAGE SETITEM
    localStorage.setItem("students",JSON.stringify(students))
    form.reset()  
    document.getElementById("rollno").value =""
    renderFilteredTable() 
});
//EDIT 
function editStudent(b){
    const s = students[b]
    document.getElementById("name").value = s.name;
    document.getElementById("rollno").value = s.roll;
    document.getElementById("class").value = s.class;
    document.getElementById("address").value = s.address;
    document.getElementById("mobile").value = s.phone
    edit = b; 
}
//DELETE
function deleteStudent(b){
    students.splice(b,1);
    localStorage.setItem("students",JSON.stringify(students))
    renderFilteredTable()
}