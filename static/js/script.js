const tools = document.querySelector(".tools ul");
const games = document.querySelector(".games ul");
const other = document.querySelector(".other ul");
const libs = document.querySelector(".libs ul");

let sec = { tools, games, other, libs };

for (let k in projects) {
    let i = projects.length - 1 - k;

    let list = "";

    projects[i].buttons.forEach(e => {
        list += `<a href="${e.link}" class="link" target="_blank">${e.text}</a>`;
    });

    let template = `
    <li>
        <div>${projects[i].name}</div>
        <span> — ${projects[i].desc}</span>
        <div class="links">${list}</div>
    </li>
    `

    sec[projects[i].type].innerHTML += template;
}