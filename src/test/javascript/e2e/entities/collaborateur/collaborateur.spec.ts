/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CollaborateurComponentsPage, CollaborateurDeleteDialog, CollaborateurUpdatePage } from './collaborateur.page-object';

const expect = chai.expect;

describe('Collaborateur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let collaborateurUpdatePage: CollaborateurUpdatePage;
  let collaborateurComponentsPage: CollaborateurComponentsPage;
  let collaborateurDeleteDialog: CollaborateurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Collaborateurs', async () => {
    await navBarPage.goToEntity('collaborateur');
    collaborateurComponentsPage = new CollaborateurComponentsPage();
    await browser.wait(ec.visibilityOf(collaborateurComponentsPage.title), 5000);
    expect(await collaborateurComponentsPage.getTitle()).to.eq('collabApp.collaborateur.home.title');
  });

  it('should load create Collaborateur page', async () => {
    await collaborateurComponentsPage.clickOnCreateButton();
    collaborateurUpdatePage = new CollaborateurUpdatePage();
    expect(await collaborateurUpdatePage.getPageTitle()).to.eq('collabApp.collaborateur.home.createOrEditLabel');
    await collaborateurUpdatePage.cancel();
  });

  it('should create and save Collaborateurs', async () => {
    const nbButtonsBeforeCreate = await collaborateurComponentsPage.countDeleteButtons();

    await collaborateurComponentsPage.clickOnCreateButton();
    await promise.all([
      collaborateurUpdatePage.setNameInput('name'),
      collaborateurUpdatePage.setContentInput('content'),
      collaborateurUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      collaborateurUpdatePage.listeSelectLastOption(),
      collaborateurUpdatePage.certifieSelectLastOption()
    ]);
    expect(await collaborateurUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await collaborateurUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await collaborateurUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await collaborateurUpdatePage.save();
    expect(await collaborateurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await collaborateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Collaborateur', async () => {
    const nbButtonsBeforeDelete = await collaborateurComponentsPage.countDeleteButtons();
    await collaborateurComponentsPage.clickOnLastDeleteButton();

    collaborateurDeleteDialog = new CollaborateurDeleteDialog();
    expect(await collaborateurDeleteDialog.getDialogTitle()).to.eq('collabApp.collaborateur.delete.question');
    await collaborateurDeleteDialog.clickOnConfirmButton();

    expect(await collaborateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
