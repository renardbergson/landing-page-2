// ====================================================== VARIABLES =====================================================
const $offerList = document.querySelector('.offerList')
const $moreOffers = document.querySelector('.moreOffers')
let offerHTML = ''

// =========================================== API REQUEST AND DATA CONSTRUCT ===========================================
document.body.onload = request()

function request(link) {
    if (!link) {
        fetch('https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1')
        .then(getResponse)
        .then(dataShow)
        .catch(error)
    } else {
        fetch(`https://${link}`)
        .then(getResponse)
        .then(dataShow)
        .catch(error)
    }
}

function getResponse(response) {
    if (response.status === 200) {
        return response.json()
    }
}


function dataShow(data) {
    const { products, nextPage } = data


    for (let product of products) {
        const { image, id, description, oldPrice, price, installments: {count, value}} = product
        
        offerHTML += `
            <li class="offer">
                <div class="thumbnail" style="background-image: url(${image});"></div>

                <span class="name"> Produto número ${id + 1} </span>

                <p class="description">
                    ${description}
                </p>

                <span class="oldPrice">De: ${oldPrice} </span>

                <h4 class="newPrice">Por: ${price} </h4>

                <span class="installments">
                    ou ${count}x de R$${value.toString().replace('.', ',')}
                </span>

                <button>Comprar</button>
            </li>
        `

        $offerList.innerHTML = offerHTML
    }

    $moreOffers.onclick = () => {
        offerHTML = offerHTML
        request(nextPage)
    }
}

function error() {
    console.log('ops, ocorreu um erro!')
}