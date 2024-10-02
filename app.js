let addbutton = document.getElementById("add");
let counter = 1;

addbutton.addEventListener("click", () => {
    let allinputs = document.querySelectorAll("input");
    let inputValues = [];
    allinputs.forEach(input => {
        inputValues.push(input.value);
    });

    if (inputValues.some(value => value === "")) {
        alert("Cells are empty.");
        return; 
    }
    let tr = document.createElement("tr"); 
    let texts = [`<input placeholder ="Name" type="text">`, `<input placeholder ="Surname" type="text">`, `<input placeholder ="Salary" type="number">`];
    
    let td = document.createElement("td");
    td.textContent = counter;
    tr.appendChild(td);

    counter++;
    let inputs = [];
    for (let i = 0; i < 3; i++) { 
        let td = document.createElement("td");
        td.classList.add("paddings");
        td.innerHTML = texts[i];
        tr.appendChild(td);
        
    }


    
    let tdbutton = document.createElement("td");
    tdbutton.innerHTML = 
        "<button id='refuse' style='background-color: red; margin-right:5px'>Refuse</button>" +
        "<button id='remember' style='background-color: green; margin-right:5px'>Remember</button>" +
        "<button class='display' id='change' style='background-color: yellow;'>Change</button>";

    tr.appendChild(tdbutton);
    let refuse = tdbutton.querySelector("#refuse")
    let remember = tdbutton.querySelector("#remember");
    let change = tdbutton.querySelector("#change");


    remember.addEventListener("click", () => {
        
        let inputs = tr.querySelectorAll("input")
        let emptyInput = false;
        inputs.forEach((input, i) => {
            if(input.value == ""){
                emptyInput = true;
            }else{
                let td = tr.children[i + 1]
                td.textContent = input.value;
                remember.classList.toggle("display");
                change.classList.toggle("display");
                refuse.innerHTML = "Delete"
            }
            
        })
        if(emptyInput){
            alert("There is nothing in input!")
        }
    });
    
    change.addEventListener("click", () => {
        remember.classList.toggle("display")
        change.classList.toggle("display")

        let savedValues = [];
        tr.querySelectorAll("td").forEach((td, i) => {
            if (i > 0 && i < 4) {
                savedValues.push(td.textContent);
            }
        });
        for (let i = 0; i < 3; i++) {
            let td = tr.children[i + 1];
            td.innerHTML = texts[i];
            td.querySelector("input").value = savedValues[i];
        }
        refuse.innerHTML ="Refuse"
    })

    refuse.addEventListener("click", () => {
        let result = confirm("Are you sure you want to delete this row?")
        if(result){
            let currentTd = refuse.closest("td");
            let currentRow = currentTd.parentElement;
            let allCells = currentRow.querySelectorAll("td");
            allCells.forEach(cell => {
                cell.style.display = "none"; 
            });
        }
    });


    
    if (!inputs.some(input => input.value === "")) {
        document.querySelector("table").appendChild(tr);
    } else {
        alert("Please fill in all fields before adding a row!");
    }

})