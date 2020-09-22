const Koa = require("koa");
const server = new Koa();
const bodyparser = require("koa-bodyparser");
server.use(bodyparser());

const err = (ctx, statusErr, bodyErr) => {
    ctx.status = statusErr;
    ctx.body = bodyErr;
}

const done = (ctx, statusDone, bodyDone) => {
    ctx.status = statusDone;
    ctx.body = bodyDone;
}

//PRODUTOS

let novoIdProduto = 0;
const listaProdutos = [];
const listaProdutosDeletados = [];

const obterListaProdutos = (ctx) => {
    const obterListaProdutos = [];
    if (listaProdutos.length === 0) {
        return err(ctx, 404, "A lista de produtos está vazia");
    } else {
        listaProdutos.forEach(x => {
            if (x.deletado === false) {
                obterListaProdutos.push(x);
            }
        });
        ctx.body = obterListaProdutos;
    }
}

const adicionarProduto = (produto, ctx) => {
    produto.forEach((x, i) => {
        const novoProduto = {
            id: novoIdProduto,
            nome: (typeof produto[i].nome === "string") ? produto[i].nome : "nomeErr",
            estoque: (typeof produto[i].estoque === "number") ? produto[i].estoque: "estoqueErr",
            valor: (typeof produto[i].valor === "number") ? produto[i].valor : "valorErr",
            deletado: false
        }
        novoIdProduto++;
        if (novoProduto.nome === "nomeErr" || novoProduto.estoque === "estoqueErr" || novoProduto.valor === "valorErr") {
            return err(ctx, 400, "Sintaxe inválida");
        } else {
            listaProdutos.push(novoProduto);
            return done(ctx, 200, "Sucesso");
        }
    });
}

const obterProduto = (ctx, idProduto) => {
    for (let x of listaProdutos) {
        if (x.id == idProduto) {
            if (x.deletado === false) {
                return ctx.body = x;
            }
        }
    }
    return err(ctx, 404, "ID não encontrado");
}

const deletarProduto = (ctx, idProduto) => {
    for (let x of listaProdutos) {
        if (x.id == idProduto) {
            listaProdutos[idProduto].deletado = true;
            listaProdutosDeletados.push(listaProdutos[idProduto]);
            listaProdutos.splice(idProduto, 1);
            done(ctx, 200, "Sucesso");
            return ctx.body = "Produto deletado com sucesso";
        }
    }
    return err(ctx, 404, "Produto não encontrado");; 
}

const atualizarProduto = (produtoAlterado, idProduto, ctx) => {
    for (let x of listaProdutos) {
        if (x.id == idProduto) {
            if (x.deletado === false) {
                if (produtoAlterado.conteudoAlterado === "nome" && typeof produtoAlterado.nome === "string") {
                    if (produtoAlterado.nome) {
                        done(ctx, 200, "Sucesso");
                        return x.nome = produtoAlterado.nome;
                    }
                } else if (produtoAlterado.conteudoAlterado === "estoque" && typeof Number(produtoAlterado.nome) === "number") {
                    if (produtoAlterado.estoque) {
                        done(ctx, 200, "Sucesso");
                        return x.estoque = produtoAlterado.estoque;
                    }
                } else if (produtoAlterado.conteudoAlterado === "valor" && typeof Number(produtoAlterado.nome) === "number") {
                    if (produtoAlterado.valor) {
                        done(ctx, 200, "Sucesso");
                        return x.valor = produtoAlterado.valor;
                    }
                } else if (produtoAlterado.conteudoAlterado === "completo") {
                    if (produtoAlterado.valor && produtoAlterado.estoque && produtoAlterado.nome) {
                        const novoProdutoAlterado = {
                            id: x.id,
                            nome: (typeof produtoAlterado.nome === "string") ? produtoAlterado.nome : "nomeErr",
                            estoque: (typeof Number(produtoAlterado.estoque) === "number") ? produtoAlterado.estoque: "estoqueErr",
                            valor: (typeof Number(produtoAlterado.valor) === "number") ? produtoAlterado.valor : "valorErr",
                            deletado: false
                        }
                        if (novoProdutoAlterado.nome === "nomeErr" || novoProdutoAlterado.estoque === "estoqueErr" || novoProdutoAlterado.valor === "valorErr") {
                            return err(ctx, 40, "Sintaxe inválida");
                        } else {
                            done(ctx, 200, "Sucesso");
                            return listaProdutos.splice(idProduto, 1, novoProdutoAlterado);
                        }
                    }
                } 
            }
        }
    }
    return err(ctx, 404, "Produto não encontrado");
}

//PEDIDOS

let novoIdPedido = 0;
const listaPedidos = [];
const listaPedidosDeletados = [];

const obterListaPedidos = (ctx) => {
    const obterListaPedidos = [];
    if (listaPedidos.length === 0) {
        return err(ctx, 404, "A lista de pedidos está vazia");
    } else {
        listaPedidos.forEach(x => {
            if (x.deletado === false) {
                obterListaPedidos.push(x);
            }
        });
        done(ctx, 200, "Sucesso");
        ctx.body = obterListaPedidos;
    }
}

const adicionarPedido = (pedido, ctx) => {
    pedido.forEach(x => {
        const novoPedido = {
            id: novoIdPedido,
            produtos: "",
            estado: "incompleto",
            idCliente: (typeof x.idCliente === "string") ? x.idCliente : "err",
            deletado: false,
            valor: ""
        }
        novoIdPedido++;
        if (novoPedido.idCliente === "err") {
            return err(ctx, 400, "Sintaxe inválida - É necessário adicionar apenas o nome do cliente");
        } else {
            listaPedidos.push(novoPedido);
            return done(ctx, 200, "Sucesso");
        }
    });
} 

const obterPedido = (ctx, idPedido) => {
    for (let x of listaPedidos) {
        if (x.id == idPedido) {
            if (x.deletado === false) {
                ctx.status = 200;
                done(ctx, 200, "Sucesso");
                return ctx.body = x;
            }
        }
    }
    return err(ctx, 404, "ID não encontrado");;
}

const deletarPedido = (ctx, idPedido) => {
    for (let x of listaPedidos) {
        if (x.id == idPedido) {
            listaPedidos[idPedido].deletado = true;
            listaPedidosDeletados.push(listaPedidos[idPedido]);
            listaPedidos.splice(idPedido, 1);
            return done(ctx, 200, "Pedido deletado com sucesso");
        }
    }
    return err(ctx, 404, "ID não encontrado");; 
}

const listaProdutosPedidos = (produtos, ctx) => {
    let listaProdutosPedidos = "";
    let check = 0;
    let check2 = 0;
    const produtosSplit = produtos.split(", ");
    for (let x of produtosSplit) {
        const produtosSplit2 = x.split("x");
        let qtd = produtosSplit2[0];
        let index = produtosSplit2[1];
        for (let produto of listaProdutos) {
            if (index == produto.id) {
                if (produto.estoque == 0 || produto.estoque < qtd) {
                    check2++;
                    break;
                }
                check = 0;
                break;
            } else {
                check++;
            }
        }
        if (check === listaProdutos.length) {
            return "err";
        } else if (check2 === 0) {
            if (listaProdutosPedidos === "") {
                listaProdutosPedidos += (qtd + "x" + index);
            } else {
                listaProdutosPedidos += (", " + qtd + "x" + index);
            }
        } else {
            check2 = 0;
        }
    }
    done(ctx, 200, "Sucesso");
    return listaProdutosPedidos;
}

let produtoEstoqueAnterior = ""
const atualizarEstoqueProdutoPro = (idPedido, ctx) => {
    for (let pedido of listaPedidos) {
        if (pedido.id == idPedido) {
            const pedidoProdutos = pedido.produtos;
            const produtosSplit = pedidoProdutos.split(", ");
            for (let x of produtosSplit) {
                const produtosSplit2 = x.split("x");
                let qtd = produtosSplit2[0];
                let index = produtosSplit2[1];
                for (let produto of listaProdutos) {
                    if (index == produto.id) {
                        if (produtoEstoqueAnterior === "") {
                            produtoEstoqueAnterior += produto.estoque + "x" + produto.id;
                        } else {
                            produtoEstoqueAnterior += ", " + produto.estoque + "x" + produto.id;
                        }
                    }
                }
                for (let produto of listaProdutos) {
                    if (index == produto.id) { 
                        produto.estoque -= qtd;
                    }
                }
                done(ctx, 200, "Sucesso");
            }   
        }
    }
    return err(ctx, 404, "ID não encontrado");
}

const atualizarEstoqueProdutoDel = () => {
    const estoqueAnteriorSplit = produtoEstoqueAnterior.split(", ");
    for (let y of estoqueAnteriorSplit) {
        const estoqueAnteriorSplit2 = y.split("x");
        for (let produto of listaProdutos) {
            if (estoqueAnteriorSplit2[1] == produto.id) {
                produto.estoque = Number(estoqueAnteriorSplit2[0]);
                produtoEstoqueAnterior = "";
            }
        }
    }
}

const atualizarQtdProdutoPedido = (idProdutoAnterior, qtdProdutoNovo, idPedido, ctx) => {
    let produtosAlterados = "";
    for (let pedido of listaPedidos) {
        if (idPedido == pedido.id && pedido.estado === "incompleto") {
            prod = pedido.produtos;
            produtosSplit = prod.split(", ");
            for (let x of produtosSplit) {
                if (x[2] != idProdutoAnterior) {
                    if (produtosAlterados === "") {
                        produtosAlterados += x;
                    } else {
                        produtosAlterados += (", " + x);
                    }
                } else {
                    if (produtosAlterados === "") {
                        produtosAlterados += `${qtdProdutoNovo}x${x[2]}`;
                    } else {
                        produtosAlterados += `, ${qtdProdutoNovo}x${x[2]}`;
                    }
                }
            }
            pedido.produtos = produtosAlterados;
            if (valorTotal(idPedido) === "err") {
                err(ctx, 404, "ID não encontrado")
            } else {
                return done(ctx, 200, "Sucesso");
            }
        }
    }
    return err(ctx, 404, "ID não encontrado")
}

const valorTotal = (idPedido) => {
    let valorTotal = 0
    for (let pedido of listaPedidos) {
        if (pedido.id == idPedido) {
            prod = pedido.produtos;
            produtosSplit = prod.split(", ");
            for (let x of produtosSplit) {
                for (let produto of listaProdutos) {
                    if (x[2] == produto.id) {
                        valorTotal += produto.valor * x[0];
                    }
                }
            }
            return pedido.valor = valorTotal;
        }
    }
    return "err";
}

const atualizarPedido = (bodyJson, idPedido, ctx) => {
    for (let x of listaPedidos) {
        if (x.id == idPedido) {
            if (x.deletado === false) {
                if (bodyJson.conteudoAlterado === "produtos" && bodyJson.produtos) {
                    if (listaProdutosPedidos(bodyJson.produtos, ctx) === "err" || x.estado !== "incompleto") {
                        err(ctx, 400, "ID de produto inválido OU estado do pedido diferente de incompleto");
                    } else {
                        x.produtos = listaProdutosPedidos(bodyJson.produtos, ctx);
                        if (valorTotal(idPedido) === "err") {
                            err(ctx, 404, "ID não encontrado")
                        } else {
                            return done(ctx, 200, "Sucesso");
                        }
                    }
                } else if (bodyJson.conteudoAlterado === "alterarQtdProdutos" && bodyJson.idProdutoAnterior && bodyJson.qtdProdutoNovo) {
                    atualizarQtdProdutoPedido(bodyJson.idProdutoAnterior, bodyJson.qtdProdutoNovo, idPedido, ctx);
                } else if (bodyJson.conteudoAlterado === "processando") {
                    if (x.produtos !== "" && x.estado !== "cancelado" ) {
                        x.estado = "processando";
                        atualizarEstoqueProdutoPro(idPedido, ctx);
                        return done(ctx, 200, "Sucesso");
                    } else {
                        return err(ctx, 404, "Lista de produtos em pedidos está vazia OU pedido cancelado");
                    }
                } else if (bodyJson.conteudoAlterado === "entregue") {
                    if (x.produtos !== "" && x.estado !== "cancelado") {
                        x.estado = "entregue";
                        return done(ctx, 200, "Sucesso");
                    } else {
                        return err(ctx, 404, "Lista de produtos em pedidos está vazia OU pedido cancelado");
                    }
                } else if (bodyJson.conteudoAlterado === "pago") {
                    if (x.produtos !== "" && x.estado !== "cancelado") {
                        x.estado = "pago";
                        return done(ctx, 200, "Sucesso");
                    } else {
                        return err(ctx, 404, "Lista de produtos em pedidos está vazia OU pedido cancelado");
                    }
                } else if (bodyJson.conteudoAlterado === "cancelado") {
                    if (x.produtos !== "") {
                        x.estado = "cancelado";
                        atualizarEstoqueProdutoDel();
                        return done(ctx, 200, "Sucesso");
                    }
                } 
            } 
        }
    }
    return err(ctx, 404, "ID não encontrado");
}

const obterPedidoExato = (interesse, ctx) => {
    const obterListaPedidos = [];
    if (listaPedidos.length === 0) {
        return err(ctx, 404, "A lista de pedidos está vazia")
    }
    if (interesse === "entregues") {
        for (let x of listaPedidos) {
            if (x.estado === "entregue") {
                obterListaPedidos.push(x);
            }
        }
        done(ctx, 200, "Sucesso");
        return ctx.body = obterListaPedidos;
    } else if (interesse === "pagos") {
        for (let x of listaPedidos) {
            if (x.estado === "pago") {
                obterListaPedidos.push(x);
            }
        }
        done(ctx, 200, "Sucesso");
        return ctx.body = obterListaPedidos;
    } else if (interesse === "processando") {
        for (let x of listaPedidos) {
            if (x.estado === "processando") {
                obterListaPedidos.push(x);
            }
        }
        done(ctx, 200, "Sucesso");
        return ctx.body = obterListaPedidos;
    } else if (interesse === "cancelados") {
        for (let x of listaPedidos) {
            if (x.estado === "cancelado") {
                obterListaPedidos.push(x);
            }
        }
        done(ctx, 200, "Sucesso");
        return ctx.body = obterListaPedidos;
    }
    return err(ctx, 404, "Não encontrado");
}

const deletarProdutoPedido = (ctx, idPedido, idProduto) => {
    let produtosAlterados = "";
    for (let pedido of listaPedidos) {
        if (idPedido == pedido.id && pedido.estado === "incompleto") {
            prod = pedido.produtos;
            produtosSplit = prod.split(", ");
            for (let x of produtosSplit) {
                if (x[2] != idProduto) {
                    if (produtosAlterados === "") {
                        produtosAlterados += x;
                    } else {
                        produtosAlterados += (", " + x);
                    }
                }
            }
        }
        pedido.produtos = produtosAlterados;
        if (valorTotal(idPedido) === "err") {
            err(ctx, 404, "ID não encontrado")
        } else {
            return done(ctx, 200, "Sucesso");
        }
    }
    return err(ctx, 404, "ID não encontrado")
}

//SERVIDORES

server.use((ctx) => {
    const path = ctx.url;
    const method = ctx.method;
    const body = ctx.request.body;

    //SERVER PRODUTO

    if (path === "/products") {
        if (method === "GET") {
            obterListaProdutos(ctx);
        } else if (method === "POST") {
            adicionarProduto(body, ctx);
        } else {
            err(ctx, 404, "Os métodos GET ou POST não estão sendo utilizados");
        }
    } else if (path.includes("/products/")) {
        const pathSplitProduto = path.split("/");
        if (pathSplitProduto[1] === "products") {
            if (pathSplitProduto[2]) {
                if (method === "GET") {
                    obterProduto(ctx, pathSplitProduto[2]);
                } else if (method === "DELETE") {
                    deletarProduto(ctx, pathSplitProduto[2]);
                } else if (method === "PUT") {
                    atualizarProduto(body, pathSplitProduto[2], ctx);
                } else {
                    err(ctx, 404, "Os métodos GET, DELETE ou PUT  não estão sendo utilizados");
                }
            } else {
                err(ctx, 404, "Não encontrado");
            }
        } else {
            err(ctx, 404, "Não encontrado");
        }
    } else {
        err(ctx, 404, "Não encontrado");
    }

    //SERVER PEDIDO 

    if (path === "/orders") {
        if (method === "GET") {
            obterListaPedidos(ctx);
        } else if (method === "POST") {
            adicionarPedido(body, ctx);
        } else {
            err(ctx, 404, "Os métodos GET ou POST não estão sendo utilizados");
        }
    } else if (path.includes("/orders/")) {
        const pathSplitPedido = path.split("/");
        if (pathSplitPedido[1] === "orders") {
            if (pathSplitPedido[2]) {
                if (method === "GET") {
                    if (pathSplitPedido[2] === "entregues") {
                        obterPedidoExato("entregues", ctx);
                    } else if (pathSplitPedido[2] === "pagos") {
                        obterPedidoExato("pagos", ctx);
                    } else if (pathSplitPedido[2] === "processando") {
                        obterPedidoExato("processando", ctx);
                    } else if (pathSplitPedido[2] === "cancelados") {
                        obterPedidoExato("cancelados", ctx);
                    } else {
                        obterPedido(ctx, pathSplitPedido[2]);
                    }
                } else if (method === "DELETE") {
                    if (pathSplitPedido[3]) {
                        deletarProdutoPedido(ctx, pathSplitPedido[2], pathSplitPedido[3]);
                    } else {
                        deletarPedido(ctx, pathSplitPedido[2]);
                    }
                } else if (method === "PUT") {
                    atualizarPedido(body, pathSplitPedido[2], ctx);
                } else {
                    err(ctx, 404, "Os métodos GET, DELETE ou PUT  não estão sendo utilizados");
                }
            } 
        }
    }  
});

server.listen(8081, () => console.log("Rodando na porta 8081"));