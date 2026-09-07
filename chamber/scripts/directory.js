const url = "data/members.json";
const container = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

getMembers();

const displayMembers = (members) => {
    container.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        
        let img = document.createElement("img");
        img.setAttribute("src", `images/${member.image}`);
        img.setAttribute("alt", `Logo de ${member.name}`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "150");
        img.setAttribute("height", "100");

        let name = document.createElement("h3");
        name.textContent = member.name;

        let address = document.createElement("p");
        address.textContent = member.address;

        let phone = document.createElement("p");
        phone.textContent = member.phone;

        let website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.textContent = member.website;

        let level = document.createElement("p");
        let levelText = member.membership === 3 ? "Gold" : member.membership === 2 ? "Silver" : "Member";
        level.textContent = `Nivel: ${levelText}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        container.appendChild(card);
    });
};

gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});