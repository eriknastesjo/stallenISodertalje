import Category from "../../interfaces/category";

// * Kallas från App.tsx
// Här kan du som programmerare ändra vilka kategorier som ska visas.
// ========================================================

const categories: Array<Partial<Category>> = [
    {
        stackName: "Park",
        title: "Parker",
        imgUrl: require("../../assets/park.png"),
        urlEndJson: '/rowstore/dataset/2cc90eb1-2c6a-444b-ab52-e4bcd22c7130'
    },
    {
        stackName: "Lekplats",
        title: "Lekplatser",
        imgUrl: require("../../assets/lekplats.png"),
        urlEndJson: '/rowstore/dataset/8861938c-e603-422f-b5b9-b49c09c15b9f'
    },
    {
        stackName: "Naturreservat",
        title: "Naturreservat",
        imgUrl: require("../../assets/naturreservat.png"),
        urlEndJson: '/rowstore/dataset/57743863-81ce-461a-9887-791b492f4522',
    },
    {
        stackName: "Vandringsled",
        title: "Vandringsleder",
        imgUrl: require("../../assets/vandringsled.png"),
        urlEndGeo: '/store/1/resource/486',
        urlEndCompl: '/rowstore/dataset/f6b33e8d-19bd-4d2d-a59b-35c4df352a2c',
    },
    {
        stackName: "Hundrastgård",
        title: "Hundrastgårdar",
        imgUrl: require("../../assets/hundrastgård.png"),
        urlEndJson: '/rowstore/dataset/1d83a1df-16ca-4bfd-8bc7-242747231b60',
    },
    {
        stackName: "Badplats",
        title: "Badplatser",
        imgUrl: require("../../assets/badplats.png"),
        urlEndJson: '/rowstore/dataset/07676184-5591-4222-8b9d-18bfc7d78f2b',
    },
    {
        stackName: "Träningsområde",
        title: "Träningsområden",
        imgUrl: require("../../assets/träningsområden.png"),
        urlEndJson: '/rowstore/dataset/1e7197b0-93d6-49ea-878f-489eff759ba7',
    },
    {
        stackName: "Träningshall",
        title: "Träningshallar",
        imgUrl: require("../../assets/träningshall.png"),
        urlEndJson: '/rowstore/dataset/c0ba78ec-b6ec-4d88-b064-4b337c431103',
    },
    {
        stackName: "Motionsspår",
        title: "Motionsspår",
        imgUrl: require("../../assets/motionsspår.png"),
        urlEndGeo: '/store/1/resource/659',
        urlEndCompl: '/rowstore/dataset/2f4c70e4-3932-4473-b94e-9858543efa8c',
    },
    {
        stackName: "Vintersport",
        title: "Vintersport",
        imgUrl: require("../../assets/vintersport.png"),
        urlEndJson: '/rowstore/dataset/6608ab30-b250-4463-aaff-4e5b448ca9d2',
    },
    {
        stackName: "Turistattraktion",
        title: "Turistattraktioner",
        imgUrl: require("../../assets/turistattraktion.png"),
        urlEndJson: '/rowstore/dataset/33f5afd7-9a53-46cb-9842-adadc9769c34',
    },
    {
        stackName: "Fågeltorn",
        title: "Fågeltorn",
        imgUrl: require("../../assets/fågeltorn.png"),
        urlEndJson: '/rowstore/dataset/adf0ed85-2614-4f0e-a1d1-531900361a9c',
    },
    {
        stackName: "Hotell",
        title: "Hotell",
        imgUrl: require("../../assets/hotell.png"),
        urlEndJson: '/rowstore/dataset/3ef1e5df-9e40-4682-8054-cca1c218ea69',
    },
    {
        stackName: "Återvinning",
        title: "Återvinning",
        imgUrl: require("../../assets/återvinning.png"),
        urlEndJson: '/rowstore/dataset/785a36e3-41bc-4726-a043-befbe60628b9',
    },

];

export default categories;