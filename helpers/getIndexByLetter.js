const getIndexByLetter = (columnLetter) => {
    const letters = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    return letters.split(",").findIndex((letter) => letter === columnLetter.toUpperCase())
}

module.exports = getIndexByLetter