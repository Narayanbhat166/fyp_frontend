dna = "AAAAAAAAA"

i = 0
s = ""
st = set()
res = []

if len(dna) >= 10:
    st.add(dna[:10])

for i in range(10, len(dna)):
    if dna[i-10:i] in st:
        res.append(dna[i-10:i])
    else:
        st.add(dna[i-10:i])

print(list(set(res)))
