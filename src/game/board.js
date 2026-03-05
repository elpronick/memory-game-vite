let selectedCards = []
let lockBoard = false
let matchedPairs = 0

export function createBoard(onMove, onWin) {

  matchedPairs = 0
  selectedCards = []
  lockBoard = false

  const board = document.getElementById("board")
  board.innerHTML = ""

  const symbols = ["🐶","🐱","🐭","🐹","🐸","🐵"]
  const cards = [...symbols, ...symbols]
  const totalPairs = symbols.length

  cards.sort(() => Math.random() - 0.5)

  cards.forEach(symbol => {

    const card = document.createElement("div")
    card.classList.add("card")
    card.textContent = "?"

    card.dataset.symbol = symbol

    card.addEventListener("click", () => {

      if (lockBoard) return
      if (card.classList.contains("revealed")) return

      card.textContent = symbol
      card.classList.add("revealed")

      selectedCards.push(card)

      onMove()

      if (selectedCards.length === 2) {

        lockBoard = true

        const [card1, card2] = selectedCards

        if (card1.dataset.symbol === card2.dataset.symbol) {

          matchedPairs++

          if (matchedPairs === totalPairs) {
            onWin()
          }

          selectedCards = []
          lockBoard = false

        } else {

          setTimeout(() => {

            card1.textContent = "?"
            card2.textContent = "?"

            card1.classList.remove("revealed")
            card2.classList.remove("revealed")

            selectedCards = []
            lockBoard = false

          }, 1000)

        }
      }

    })

    board.appendChild(card)

  })
}