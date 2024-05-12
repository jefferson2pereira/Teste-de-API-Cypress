/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contratos'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    //TODO: 
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)

    })
      })
  });


it.only('Deve listar usuários cadastrados', () => { 
  cy.request({
    method: 'GET',
    url: 'usuarios', }) 

  .should((resp) => {
  expect(resp.status).to.eql(200) })

});

it('Deve cadastrar um usuário com sucesso', () => {
  // Cypress.Commands.add('cadastrarUsuario', (method, nome, email, senha, adm)
  cy.cadastrarUsuario('POST', 'Joao Carlos 07', 'JCarlos07@qa.com.br', 'teste123', 'false')

    .should((response) => {
      expect(response.status).to.equal(201),
        expect(response.body.message).to.equal('Cadastro realizado com sucesso')  })

});


it.only('Deve validar um usuário com email inválido', () => {
  // Cypress.Commands.add('cadastrarUsuario', (method, nome, email, senha, adm)
  cy.cadastrarUsuario('POST', 'Joao Carlos', 'JCarlos3@qa.com.br', 'teste123', 'false')

    .should((response) => {
      expect(response.status).to.equal(400),
        expect(response.body.message).to.equal('Este email já está sendo usado')  })

});

it('Deve editar um usuário previamente cadastrado', () => {
  
  cy.request('usuarios').then(response => {
    let id = response.body.usuarios[6]._id
    cy.request({
      method: 'PUT',
      url: `usuarios/${id}`,
      body:
      {
        "nome": "João Silva edit",
        "email": "Silva@qa.com.br",
        "password": "teste123",
        "administrador": "false"
      }  
    }).should((response) => {
      expect(response.body.message).to.equal('Registro alterado com sucesso'),
        expect(response.status).to.equal(200) })
  })

});

it('Deve deletar um usuário previamente cadastrado', () => {
  //TODO: 
  cy.request('usuarios').then(response => {
    let id = response.body.usuarios[2]._id

    cy.request({
      method: 'DELETE',
      url: `usuarios/${id}`

    }).should((resp) => {
      expect(resp.body.message).to.equal('Registro excluído com sucesso'),
        expect(resp.status).to.equal(200) })

  })

});

