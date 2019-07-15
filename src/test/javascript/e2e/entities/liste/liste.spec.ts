/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ListeComponentsPage, ListeDeleteDialog, ListeUpdatePage } from './liste.page-object';

const expect = chai.expect;

describe('Liste e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let listeUpdatePage: ListeUpdatePage;
  let listeComponentsPage: ListeComponentsPage;
  let listeDeleteDialog: ListeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Listes', async () => {
    await navBarPage.goToEntity('liste');
    listeComponentsPage = new ListeComponentsPage();
    await browser.wait(ec.visibilityOf(listeComponentsPage.title), 5000);
    expect(await listeComponentsPage.getTitle()).to.eq('collabApp.liste.home.title');
  });

  it('should load create Liste page', async () => {
    await listeComponentsPage.clickOnCreateButton();
    listeUpdatePage = new ListeUpdatePage();
    expect(await listeUpdatePage.getPageTitle()).to.eq('collabApp.liste.home.createOrEditLabel');
    await listeUpdatePage.cancel();
  });

  it('should create and save Listes', async () => {
    const nbButtonsBeforeCreate = await listeComponentsPage.countDeleteButtons();

    await listeComponentsPage.clickOnCreateButton();
    await promise.all([listeUpdatePage.setNameInput('name')]);
    expect(await listeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await listeUpdatePage.save();
    expect(await listeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await listeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Liste', async () => {
    const nbButtonsBeforeDelete = await listeComponentsPage.countDeleteButtons();
    await listeComponentsPage.clickOnLastDeleteButton();

    listeDeleteDialog = new ListeDeleteDialog();
    expect(await listeDeleteDialog.getDialogTitle()).to.eq('collabApp.liste.delete.question');
    await listeDeleteDialog.clickOnConfirmButton();

    expect(await listeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
