import { TranslateService } from "@ngx-translate/core";
import { Loading, LoadingController } from "ionic-angular";

/**
 * Show an alert that say to wait.
 * @author Guillaume Quittet
 */
export class AlertLoading {

    // The loading object
    private loading: Loading;

    // String UI
    private pleaseWaitText: string;

    /**
     * Create the AlertLoading object.
     * @param loadingCtrl The loading controller.
     * @param translate The translate service.
     */
    constructor(private loadingCtrl: LoadingController, translate: TranslateService) {
        translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    }

    /**
     * Create and show an alert of type loading.
     */
    show(): void {
        this.loading = this.loadingCtrl.create({
            content: this.pleaseWaitText
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
    }
}