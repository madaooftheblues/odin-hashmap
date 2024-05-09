function HashMap() {
    let _size = 16
    let buckets = new Array(_size)

    function hash(key) {
        let hashCode = 0

        const primeNumber = 31

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _size
        }

        return hashCode
    }

    function set(key, value) {
        const index = hash(key)
        if (index < 0 || index >= buckets.length) {
            throw new Error('Trying to access index out of bound')
        }

        if (!buckets[index]) {
            buckets[index] = { key, value }
            return
        }

        if (buckets[index].key === key) {
            buckets[index].value = value
            return
        }

        if (Array.isArray(buckets[index])) {
            const list = buckets[index]
            for (let i = 0; i < list.length; i++) {
                if (list[i].key === key) {
                    list[i].value = value
                    return
                }
            }

            list.push({ key, value })
            return
        }

        const list = []
        list.push(buckets[index])
        list.push({ key, value })
        buckets[index] = list
    }

    function get(key) {
        const index = hash(key)
        if (index < 0 || index >= buckets.length) {
            throw new Error('Trying to access index out of bound')
        }

        if (!buckets[index]) return null

        if (Array.isArray(buckets[index])) {
            const list = buckets[index]
            for (let i = 0; i < list.length; i++)
                if (list[i].key === key) return list[i].value

            return null
        }

        if (buckets[index].key === key) return buckets[index].value

        return null
    }

    return { set, get }
}
