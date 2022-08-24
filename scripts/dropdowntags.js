/* creation des options de selection via class { dropdownTags } */

export default class dropdowntags {
    constructor(selector, string, elementParent) {
        this.selector = selector;
        this.string = string;
        this.elementParent = elementParent;
        this.element = this.buildTag(string);
    }

    buildTag(string) {
        const tag = document.createElement("div");
        tag.classList.add("tag");
        const tagText = document.createElement("p");
        tagText.classList.add("tag_text");
        const tagClose = document.createElement("i");
        tagClose.classList.add("tag_close", "far", "fa-times-circle");

        tag.appendChild(tagText);
        tag.appendChild(tagClose);

        tagText.innerText = string;

        this.selector.appendChild(tag);

        /* modicateur de la couleur du tag suivant la catégorie choisie */

        if (
            this.elementParent.id === "dropdown_ingredient" ||
            this.elementParent.classList.contains("ingredient_color")
        ) {
            tag.classList.add("ingredient_color");
        } else if (
            this.elementParent.id === "dropdown_appliance" ||
            this.elementParent.classList.contains("appliance_color")
        ) {
            tag.classList.add("appliance_color");

        } else if (
            this.elementParent.id === "dropdown_ustensil" ||
            this.elementParent.classList.contains("ustensil_color")
        ) {
            tag.classList.add("ustensil_color");
        }
        return tag;
    }
}