function HashMap() {
    let _size = 16
    let buckets = new Array(_size)
    let _len = 0

    function hash(key) {
        let hashCode = 0

        const primeNumber = 31

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _size
        }

        return hashCode
    }

    function genHash(key) {
        const index = hash(key)
        if (index < 0 || index >= buckets.length) {
            throw new Error('Trying to access index out of bound')
        }

        return index
    }

    function set(key, value) {
        const index = genHash(key)

        if (!buckets[index]) {
            buckets[index] = { key, value }
            _len++
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
            _len++
            return
        }

        if (buckets[index].key === key) {
            buckets[index].value = value
            return
        }

        const list = []
        list.push(buckets[index])
        list.push({ key, value })
        buckets[index] = list
        _len++
    }

    function get(key) {
        const index = genHash(key)

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

    function has(key) {
        const index = genHash(key)

        if (!buckets[index]) return false

        if (Array.isArray(buckets[index])) {
            const list = buckets[index]
            for (let i = 0; i < list.length; i++)
                if (list[i].key === key) return true

            return false
        }

        if (buckets[index].key === key) return true

        return false
    }

    function remove(key) {
        const index = genHash(key)

        if (!buckets[index]) return false

        if (Array.isArray(buckets[index])) {
            const list = buckets[index]
            for (let i = 0; i < list.length; i++)
                if (list[i].key === key) {
                    list.splice(i, 1)
                    _len--
                    return true
                }

            return false
        }

        if (buckets[index].key === key) {
            buckets[index] = undefined
            _len--
            return true
        }

        return false
    }

    function length() {
        return _len
    }

    function clear() {
        _size = 16
        buckets = new Array(_size)
        _len = 0
    }

    function keys() {
        const keys = []
        for (let i = 0; i < _size; i++) {
            if (!buckets[i]) continue

            if (Array.isArray(buckets[i])) {
                const list = buckets[i]
                for (let j = 0; j < list.length; j++) keys.push(list[j].key)
                continue
            }

            keys.push(buckets[i].key)
        }

        return keys
    }

    return { set, get, has, remove, length, clear, keys }
}
