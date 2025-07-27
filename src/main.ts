import {AppController} from "./controller/AppController";

window.onload = async () => {
    const appController = new AppController();
    await appController.init();
};
