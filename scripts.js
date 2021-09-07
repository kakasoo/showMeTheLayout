// variable
const tags = [
    { tag: "div", color: "#F54E3B" },
    { tag: "span", color: "#D6458A" },
    { tag: "ul", color: "#D04DEB" },
    { tag: "li", color: "#753BD4" },
    { tag: "dd", color: "#3744FA" },
    { tag: "dl", color: "#E36EF5" },
    { tag: "section", color: "#9C72D6" },
    { tag: "h1", color: "#7E82EB" },
    { tag: "a", color: "#689AD4" },
    { tag: "img", color: "#6BECFA" },
    { tag: "form", color: "#58C8F5" },
    { tag: "button", color: "#5ED6C3" },
    { tag: "header", color: "#6AEB9A" },
    { tag: "footer", color: "#65D455" },
    { tag: "input", color: "#C9FA55" },
    { tag: "p", color: "#FAE25B" },
];

// Create chrome extension body.
window.onload = () => {
    tags.forEach(({ tag, color }) => {
        console.log(color);
        const tagBox = document.createElement("div");
        tagBox.className = "tagBox";
        tagBox.innerHTML = `
					<div class="tagName">${tag}</div>
					<input id="${tag}Check" class ="tagCheck" type="checkbox" name="tags" />
					<input id="${tag}Color" class="color" type="color" value="${color}" />
					<input
							id="${tag}Thickness"
							class="thickness"
							type="range"
							min="1"
							,
							max="10"
							,
							step="0.1"
							value="1"
					/>
				`;
        document.body.appendChild(tagBox);
    });
    const kakasoo = document.createElement("p");
    kakasoo.innerText = "created by kakasoo";
    kakasoo.style.float = "right";
    document.body.appendChild(kakasoo);
};

// work process
const work = () => {
    tags.forEach(({ tag }) => {
        const tagChecked = document.getElementById(`${tag}Check`).checked;
        const tagColor = document.getElementById(`${tag}Color`).value;
        const tagThickness = document.getElementById(`${tag}Thickness`).value;

        console.log(tagChecked, tagColor, tagThickness);
        if (tagChecked) {
            // 컨텐츠 페이지를 대상으로 코드 작성

            chrome.tabs.executeScript({
                code: `document.querySelectorAll("${tag}").forEach((el) => {
									el.style.outline = "${tagThickness}px solid ${tagColor}";
								});`,
            });
        } else {
            chrome.tabs.executeScript({
                code: `document.querySelectorAll("${tag}").forEach((el) => {
									el.style.outline = "none";
								});`,
            });
        }
    });
};

window.onclick = () => {
    work();
};

document.querySelectorAll("input").forEach((htmlElement) => {
    htmlElement.onchange = () => {
        work();
    };
});
