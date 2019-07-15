import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CollaborateurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-collaborateur div table .btn-danger'));
  title = element.all(by.css('jhi-collaborateur div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CollaborateurUpdatePage {
  pageTitle = element(by.id('jhi-collaborateur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  contentInput = element(by.id('field_content'));
  dateInput = element(by.id('field_date'));
  listeSelect = element(by.id('field_liste'));
  certifieSelect = element(by.id('field_certifie'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async listeSelectLastOption(timeout?: number) {
    await this.listeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listeSelectOption(option) {
    await this.listeSelect.sendKeys(option);
  }

  getListeSelect(): ElementFinder {
    return this.listeSelect;
  }

  async getListeSelectedOption() {
    return await this.listeSelect.element(by.css('option:checked')).getText();
  }

  async certifieSelectLastOption(timeout?: number) {
    await this.certifieSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async certifieSelectOption(option) {
    await this.certifieSelect.sendKeys(option);
  }

  getCertifieSelect(): ElementFinder {
    return this.certifieSelect;
  }

  async getCertifieSelectedOption() {
    return await this.certifieSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CollaborateurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-collaborateur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-collaborateur'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
