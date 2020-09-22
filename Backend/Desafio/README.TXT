//PRODUTOS

POST -> /products
Exemplo de entrada:

	[
		{
			"nome": "Queijo",
    			"estoque": 0,
    			"valor": 200
		},
		{
			"nome": "Presunto",
    			"estoque": 23,
    			"valor": 300
		},
		{
			"nome": "Requeijão",
   			"estoque": 12,
    			"valor": 350
		},
		{
			"nome": "Peito de Peru",
    			"estoque": 18,
   			"valor": 320
		},
		{
			"nome": "Rap 10",
    			"estoque": 10,
    			"valor": 400
		},
		{
			"nome": "Pão",
    			"estoque": 67,
    			"valor": 40
		}
	
	]

GET -> /products
Exemplo de saída:

	[
 		{
    			"id": 0,
    			"nome": "Queijo",
    			"estoque": 0,
    			"valor": 200,
    			"deletado": false
  		},
  		{
    			"id": 1,
    			"nome": "Presunto",
    			"estoque": 23,
    			"valor": 300,
    			"deletado": false
  		},
  		{
    			"id": 2,
    			"nome": "Requeijão",
    			"estoque": 12,
    			"valor": 300,
    			"deletado": false
  		},
  		{
    			"id": 3,
    			"nome": "Requeijão",
    			"estoque": 12,
   			"valor": 300,
    			"deletado": false
  		},
  		{
    			"id": 4,
    			"nome": "Requeijão",
    			"estoque": 12,
    			"valor": 300,
    			"deletado": false
  		},
  		{
   			"id": 5,
    			"nome": "Pão",
    			"estoque": 67,
    			"valor": 40,
    			"deletado": false
  		}
	]

GET -> /products/id
Exemplo de saída: (/products/0)

	{
  		"id": 0,
  		"nome": "Queijo",
  		"estoque": 0,
  		"valor": 200,
  		"deletado": false
	}

DEL -> /products/id *Apaga um produto inteiro

PUT -> /products/id
Exemplos de entrada: (/products/0)

	*Altera por nome e valor do produto
	{
		"conteudoAlterado":"completo",
		"nome":"XXX",
		"estoque":666,
		"valor":333
	}

	*Altera o estoque do produto
	{
	"conteudoAlterado":"estoque",
	"estoque":333
	}

	*Altera o nome do produto
	{
	"conteudoAlterado":"nome",
	"nome":"XXX"	
	}

	*Altera o valor do produto
	{
	"conteudoAlterado":"valor",
	"valor":666
	}

//PEDIDOS

POST -> /orders
Exemplo de entrada: 

	[
		{
   			"idCliente": "Nicolas"
		},
		{
    			"idCliente": "Pablo"
		}
	]

GET -> /orders
Exemplo de saída:

	[
  		{
    			"id": 0,
    			"produtos": "",
    			"estado": "incompleto",
    			"idCliente": "Nicolas",
    			"deletado": false,
    			"valor": ""
  		},
  		{
    			"id": 1,
    			"produtos": "",
    			"estado": "incompleto",
    			"idCliente": "Pablo",
    			"deletado": false,
    			"valor": ""
  		}
	]

GET -> /orders/id
Exemplo de saída: (/orders/0)

	{
  		"id": 0,
  		"produtos": "",
  		"estado": "incompleto",
  		"idCliente": "Nicolas	",
  		"deletado": false,
  		"valor": ""
	}

GET -> /orders/entregues *Mostra apenas pedidos entregues

GET -> /orders/pagos *Mostra apenas pedidos pagos

GET -> /orders/processando *Mostra apenas pedidos processando

GET -> /orders/cancelados *Mostra apenas pedidos cancelados

DEL -> /orders/id *Apaga um pedido inteiro

DEL -> /orders/idPedido/idProduto *Apaga um produto dentro de um pedido

PUT -> /orders/:id
Exemplos de entrada: (/orders/0)

	*Adiciona produtos dentro de um pedido (Quantidade x idProduto)
	{
		"conteudoAlterado":"produtos",
		"produtos":"3x1, 4x3, 9x2"
	}

	*Altera o estado do pedido para "processando"
	{
		"conteudoAlterado":"processando"
	}

	*Altera o estado do pedido para "pago"
	{
		"conteudoAlterado":"pago"
	}

	*Altera o estado do pedido para "cancelado"
	{
		"conteudoAlterado":"cancelado"
	}

	*Altera o estado do pedido para "entregue"
	{
		"conteudoAlterado":"entregue"
	}

	*Altera a quantidade de um produto dentro de um pedido
	{
		"conteudoAlterado":"alterarQtdProdutos",
		"idProdutoAnterior":2,
		"qtdProdutoNovo":8
	}

*Se ficou muito confuso, perdão ;-;. Qualquer dúvida chama discord:
	-Guido Bernal (Slancow#8639)
