/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CertifieComponentsPage, CertifieDeleteDialog, CertifieUpdatePage } from './certifie.page-object';

const expect = chai.expect;

describe('Certifie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let certifieUpdatePage: CertifieUpdatePage;
  let certifieComponentsPage: CertifieComponentsPage;
  let certifieDeleteDialog: CertifieDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Certifies', async () => {
    await navBarPage.goToEntity('certifie');
    certifieComponentsPage = new CertifieComponentsPage();
    await browser.wait(ec.visibilityOf(certifieComponentsPage.title), 5000);
    expect(await certifieComponentsPage.getTitle()).to.eq('collabApp.certifie.home.title');
  });

  it('should load create Certifie page', async () => {
    await certifieComponentsPage.clickOnCreateButton();
    certifieUpdatePage = new CertifieUpdatePage();
    expect(await certifieUpdatePage.getPageTitle()).to.eq('collabApp.certifie.home.createOrEditLabel');
    await certifieUpdatePage.cancel();
  });

  it('should create and save Certifies', async () => {
    const nbButtonsBeforeCreate = await certifieComponentsPage.countDeleteButtons();

    await certifieComponentsPage.clickOnCreateButton();
    await promise.all([certifieUpdatePage.setNameInput('name')]);
    expect(await certifieUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await certifieUpdatePage.save();
    expect(await certifieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await certifieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Certifie', async () => {
    const nbButtonsBeforeDelete = await certifieComponentsPage.countDeleteButtons();
    await certifieComponentsPage.clickOnLastDeleteButton();

    certifieDeleteDialog = new CertifieDeleteDialog();
    expect(await certifieDeleteDialog.getDialogTitle()).to.eq('collabApp.certifie.delete.question');
    await certifieDeleteDialog.clickOnConfirmButton();

    expect(await certifieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
