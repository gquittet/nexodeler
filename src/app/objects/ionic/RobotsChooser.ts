import { File } from "@ionic-native/file";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, LoadingController, NavController, ViewController } from "ionic-angular";
import { QiService } from "../../services/naoqi/qi.service";
import { RobotsService } from "../../services/robots/robots.service";
import { SettingsService } from "../../services/settings/settings.service";
import { IP } from "../IP";
import { Robot } from "../Robot";
import { Theme } from "../Theme";
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
    private _robots: Robot[];

    // String UI
    private _cancelText: string;
    private _connectText: string;
    private _errorAddAtLeastOneRobotText: string;
    private _errorNoRobotFoundText: string;
    private _errorText: string;
    private _okText: string;
    private _robotsText: string;

    // Subscription
    private _takeWhile: boolean = true;

    // UI
    private _robotsAlertCombobox: AlertRadioButton;
    private _loading: AlertLoading;
    // Theme
    private _theme: Theme;

    /**
     * Create an alert of type of robots chooser.
     * @param _navCtrl The navigation controller.
     * @param _viewCtrl The view controller.
     * @param _translate The translate service.
     * @param _alertCtrl The alert controller.
     * @param _robotsService The robots service.
     * @param loadingCtrl The loading controller.
     * @param file The file service.
     */
    constructor(private _navCtrl: NavController, private _viewCtrl: ViewController, private _translate: TranslateService, private _alertCtrl: AlertController, private _robotsService: RobotsService, loadingCtrl: LoadingController, file: File, private _settingsService: SettingsService) {
        this.loadTranslations();
        this._loading = new AlertLoading(loadingCtrl, _translate, _settingsService);
        file.checkFile(file.dataDirectory, this._robotsService.fileName).then(res => {
            if (res) {
                file.readAsText(file.dataDirectory, this._robotsService.fileName).then(data => {
                    this._robots = JSON.parse(data);
                    this._robotsService.next(this._robots);
                });
            }
        }, err => { });
        this._robotsService.robots.takeWhile(() => this._takeWhile).subscribe((robots: Robot[]) => this._robots = robots);
        this._robotsAlertCombobox = new AlertRadioButton(this._alertCtrl, _settingsService);
    }

    /**
     * Load the translation for the UI
     */
    private loadTranslations(): void {
        this._translate.get("ERROR.ERROR").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._errorText = res));
        this._translate.get("ERROR.ADD_AT_LEAST_A_ROBOT").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._errorAddAtLeastOneRobotText = res));
        this._translate.get("ERROR.NO_ROBOT_FOUND").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._errorNoRobotFoundText = res));
        this._translate.get("VERBS.CANCEL").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._cancelText = res));
        this._translate.get("VERBS.CONNECT").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._connectText = res));
        this._translate.get("OK").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._okText = res));
        this._translate.get("ROBOTS").takeWhile(() => this._takeWhile).subscribe((res: string) => (this._robotsText = res));
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
        this._loading.show();
        let robotsPingSuccess: Robot[] = [];
        const promises = [];
        if (this._robots.length > 0) {
            this._robots.forEach((robot: Robot) => {
                promises.push(pingRobot(robot));
            });
        }
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
        this._loading.close();
        return robotsPingSuccess;
    }

    /**
     * Show an alert to choose one robot.
     * @param obj The object which the function belongs.
     * @param func The function to execute.
     * @param args The arguments (optional).
     */
    show(obj: Object, func: Function, ...args): void {
        this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
        const robotsAlertCombobox = this._robotsAlertCombobox.create(this._robotsText);
        this.pingRobots().then((robots: Robot[]) => {
            if (robots.length == 0) {
                console.error('[ERROR][PING][ROBOTS] Add at least one robot.');
                this._alertCtrl.create({
                    title: this._errorText,
                    subTitle: this._errorAddAtLeastOneRobotText,
                    cssClass: this._theme.class,
                    enableBackdropDismiss: false,
                    buttons: [{
                        text: this._okText,
                        handler: () => {
                            if (this._exitOnCancel)
                                this._navCtrl.remove(this._viewCtrl.index, 1)
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
                    text: this._cancelText,
                    handler: () => {
                        this._robotsAlertCombobox.close();
                        this._takeWhile = false;
                        if (this._exitOnCancel)
                            this._navCtrl.remove(this._viewCtrl.index, 1)
                    }
                });

                robotsAlertCombobox.addButton({
                    text: this._connectText,
                    handler: data => {
                        if (data) {
                            this._robotsAlertCombobox.close();
                            this._takeWhile = false;
                            this._loading.show();
                            QiService.connect(new IP(data.split('.')));
                            if (args)
                                func.apply(obj, args);
                            else
                                func.call(obj);
                            this._loading.close();
                            this._robotsAlertCombobox.result = data;
                        }
                    }
                });
                robotsAlertCombobox.present();
            }
        });
    }
}
