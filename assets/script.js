const tags_ = document.getElementById("tags");
const projects_ = document.getElementById("projects");

for (let i in tags) {
    document.getElementsByTagName("style")[0].innerHTML += `
        .${tags[i].name}::after {
            background-color: ${tags[i].c};
        }
    `;

    tags_.innerHTML += `
        <span class="${tags[i].name}">${tags[i].text}</span>
    `
}

for (let i in projects) {
    projects_.innerHTML += `
    <div class="c_e">
        <span class="${tags[projects[i].cat].name}">${projects[i].name}</span>
        <div class="a_b">
            <a href="${projects[i].source}">Source</a>
            <a href="${projects[i].live}">Live</a>
        </div>
    </div>
    `;
}