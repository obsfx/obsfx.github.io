const projects_ = document.getElementById("expcon");
// const pens_ = document.getElementById("penscon");

for (let k in projects) {
    let i = projects.length - 1 - k;

    let list = "";

    projects[i].buttons.forEach(e => {
        list += `<li><a target="_blank" href="${e.link}">→ ${e.text}</a></li>`
    });
    
    projects_.innerHTML += `
        <r-cell span=1 class="entity">
            <r-grid columns=3 class="experiments">
                <r-cell span=3>
                    <img src="./static/${projects[i].img}">
                </r-cell>

                <r-cell span=3>
                    <h3>${projects[i].name}</h3>
                    <p>— ${projects[i].desc}</p>
                    <ul>
                        ${list}
                    </ul>
                </r-cell>
            </r-grid>
        </r-cell>
    `;

    // projects_.innerHTML += `
    //     <div class="exp-items-item">
    //         <div class="exp-items-item-showcase">
    //             <img src="./static/${projects[i].img}">
    //         </div>

    //         <div class="exp-items-item-head">
    //             <h2>${projects[i].name}</h2>
    //             <p>${projects[i].desc}</p>
    //         </div>

    //         <div class="exp-items-item-bottom">
    //             <h5>related topics</h5>

    //             <div class="exp-items-item-bottom-tags">
    //                 <span>${projects[i].tags.join("</span><span>")}</span>
    //             </div>
    //         </div>

    //         <div class="exp-items-item-links">
    //             ${sourcelink}
    //             ${livelink}
    //         </div>
    //     </div>
    // `;

    /*projects_.innerHTML += `
    <div class="ex">
        <span class="${tags[projects[i].cat].name}">${projects[i].name}</span>
        <div class="item_inline">
            <a href="${projects[i].source}" target="_blank">Source</a>
            <a href="${projects[i].live}" target="_blank">Live</a>
        </div>
        <div class="item_tags">
            <span>${projects[i].tags.join("</span><span>")}</span>
        </div>
    </div>
    `;*/
}

// for (let k in pens) {
//     pens_.innerHTML += pens[pens.length - 1 - k];
// }