import { File } from "@ionic-native/file";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController, NavController, ViewController } from "ionic-angular";
import { Subscription } from "rxjs";
import { QiService } from "../../services/naoqi/qi.service";
import { RobotsService } from "../../services/robots/robots.service";
import { IP } from "../IP";
import { Robot } from "../Robot";
import { AlertLoading } from "./AlertLoading";
import { AlertRadioButton } from "./AlertRadioButton";

declare var pingRobot: any;

/**
 * An alert that let to choose on robot which is up and connected to the same
 * network as the remote control.
 * @author Guillaume Quittet
 */
export class RobotsChooser {

    // Attributes
    private _exitOnCancel: boolean = false;

    // Objects
    private robots: Robot[];
    private robotsSubcription: Subscription;

    // String UI
    private cancelText: string;
    private connectText: string;
    private errorAddAtLeastOneRobotText: string;
    private errorNoRobotFoundText: string;
    private errorText: string;
    private okText: string;
    private robotsText: string;

    // UI
    private robotsAlertCombobox: AlertRadioButton;
    private loading: AlertLoading;

    /**
     * Create an alert of type of robots chooser.
     * @param navCtrl The navigation controller.
     * @param viewCtrl The view controller.
     * @param translate The translate service.
     * @param alertCtrl The alert controller.
     * @param robotsService The robots service.
     * @param loadingCtrl The loading controller.
     * @param file The file service.
     */
    constructor(private navCtrl: NavController, private viewCtrl: ViewController, private translate: TranslateService, private alertCtrl: AlertController, private robotsService: RobotsService, loadingCtrl: LoadingController, file: File) {
        this.loadTranslations();
        this.loading = new AlertLoading(loadingCtrl, translate);
        file.checkFile(file.dataDirectory, this.robotsService.FILE_NAME).then(res => {
            if (res) {
                file.readAsText(file.dataDirectory, this.robotsService.FILE_NAME).then(data => {
                    this.robots = JSON.parse(data);
                    this.robotsService.next(this.robots);
                });
            }
        }, err => { });
        this.robotsSubcription = this.robotsService.robots.subscribe((robots: Robot[]) => this.robots = robots);
        this.robotsAlertCombobox = new AlertRadioButton(this.alertCtrl);
    }

    /**
     * Load the translation for the UI
     */
    private loadTranslations(): void {
        this.translate.get("ERROR.ERROR").subscribe((res: string) => (this.errorText = res));
        this.translate.get("ERROR.ADD_AT_LEAST_A_ROBOT").subscribe((res: string) => (this.errorAddAtLeastOneRobotText = res));
        this.translate.get("ERROR.NO_ROBOT_FOUND").subscribe((res: string) => (this.errorNoRobotFoundText = res));
        this.translate.get("VERBS.CANCEL").subscribe((res: string) => (this.cancelText = res));
        this.translate.get("VERBS.CONNECT").subscribe((res: string) => (this.connectText = res));
        this.translate.get("OK").subscribe((res: string) => (this.okText = res));
        this.translate.get("ROBOTS").subscribe((res: string) => (this.robotsText = res));
    }

    /**
     * If true, Ionic will remove the current view on cancel this alert.
     */
    set exitOnCancel(_exitOnCancel: boolean) {
        this._exitOnCancel = _exitOnCancel;
    }

    /**
     * Send an ICMP packet to all the robots.
     * @returns {Promise<Robot[]>} The array of robots that have respond to the request.
     */
    private async pingRobots(): Promise<Robot[]> {
        this.loading.show();
        let robotsPingSuccess: Robot[] = [];
        const promises = [];
        if (this.robots.length > 0) {
            this.robots.forEach((robot: Robot) => {
                promises.push(pingRobot(robot));
            });
        }
        this.robotsSubcription.unsubscribe();
        for (let promise of promises) {
            let robot: Robot;
            try {
                robot = await promise;
                if (robot)
                    robotsPingSuccess.push(robot);
            } catch (err) {
                console.error('[ERROR][PING][ROBOTS] Unable to find any robot.');
            }
        }
        this.loading.close();
        return robotsPingSuccess;
    }

    /**
     * Show an alert to choose one robot.
     * @param obj The object which the function belongs.
     * @param func The function to execute.
     * @param args The arguments (optional).
     */
    show(obj: Object, func: Function, ...args): void {
        const robotsAlertCombobox = this.robotsAlertCombobox.create(this.robotsText);
        this.pingRobots().then((robots: Robot[]) => {
            if (robots.length == 0) {
                console.error('[ERROR][PING][ROBOTS] Unable to find any robot.');
                this.alertCtrl.create({
                    title: this.errorText,
                    subTitle: this.errorNoRobotFoundText,
                    enableBackdropDismiss: false,
                    buttons: [{
                        text: this.okText,
                        handler: () => {
                            if (this._exitOnCancel)
                                this.navCtrl.remove(this.viewCtrl.index, 1)
                        }
                    }]
                }).present();
            } else {
                robots.forEach((robot: Robot) => {
                    robotsAlertCombobox.addInput({
                        type: 'radio',
                        label: robot.name + ' (' + robot.ip + ')',
                        value: robot.ip,
                        checked: false
                    });
                });

                robotsAlertCombobox.addButton({
                    text: this.cancelText,
                    handler: () => {
                        this.robotsAlertCombobox.close();
                        if (this._exitOnCancel)
                            this.navCtrl.remove(this.viewCtrl.index, 1)
                    }
                });

                robotsAlertCombobox.addButton({
                    text: this.connectText,
                    handler: data => {
                        if (data) {
                            this.robotsAlertCombobox.close();
                            this.loading.show();
                            QiService.connect(new IP(data.split('.')));
                            if (args)
                                func.apply(obj, args);
                            else
                                func.call(obj);
                            this.loading.close();
                            this.robotsAlertCombobox.setResult(data);
                        }
                    }
                });
                robotsAlertCombobox.present();
            }
        });
    }
}
