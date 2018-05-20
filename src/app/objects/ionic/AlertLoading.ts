import { TranslateService } from "@ngx-translate/core";
import { Loading, LoadingController } from "ionic-angular";
import { Subscription } from "rxjs";
import { SettingsService } from "../../services/settings/settings.service";
import { Theme } from "../Theme";

/**
 * Show an alert that say to wait.
 * @author Guillaume Quittet
 */
export class AlertLoading {

    // The loading object
    private loading: Loading;

    // String UI
    private pleaseWaitText: string;

    // UI
    // Theme
    private _theme: Theme;
    private _themeSubscription: Subscription;

    /**
     * Create the AlertLoading object.
     * @param _loadingCtrl The loading controller.
     * @param translate The translate service.
     * @param _settingsService The service to access to settings data.
     */
    constructor(private _loadingCtrl: LoadingController, translate: TranslateService, private _settingsService: SettingsService) {
        translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    }

    /**
     * Create and show an alert of type loading.
     */
    show(): void {
        this._themeSubscription = this._settingsService.theme.subscribe((theme: Theme) => this._theme = theme);
        this.loading = this._loadingCtrl.create({
            content: this.pleaseWaitText,
            cssClass: this._theme.class
        });
        this.loading.present();
    }

    /**
     * Close the current alert of type loading.
     */
    close(): void {
        if (!this.loading)
            throw "[ERROR][LOADING][Close] Loading is not showing!";
        this.loading.dismiss();
        this._themeSubscription.unsubscribe();
    }
}