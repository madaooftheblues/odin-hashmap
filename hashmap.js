function HashMap() {
    let _size = 16

    function hash(key) {
        let hashCode = 0

        const primeNumber = 31

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _size
        }

        return hashCode
    }

    return { hash }
}
