function Matrix(matrix) {
    this.matrix = matrix;
    this.rowCount = this.matrix.length;
    this.colCount = this.matrix[0].length;
}

Matrix.prototype.multiply = function(otherMatrix) {

    if (otherMatrix.constructor.name != "Matrix") {
        throw new Error("Multiply function parameter must be 'Matrix' object");
    }

    if (this.colCount != otherMatrix.rowCount) {
        throw new Error("Columns of A must match rows of B");
    }

    let result = [];

    for (let i = 0; i < otherMatrix.colCount; i++) {
        for (let k = 0; k < this.rowCount; k++) {
            let sum = 0;
            for (let j = 0; j < otherMatrix.rowCount; j++) {
                sum += otherMatrix.matrix[j][i] * this.matrix[k][j];
            }

            if (i == 0) {
                result.push([sum])
            } else {
                result[k].push(sum);
            }
        }
    }

    return new Matrix(result);
}

function convertXY(p, m) {
    return {x: p.matrix[0][0] * m, y: p.matrix[1][0] * m}
}