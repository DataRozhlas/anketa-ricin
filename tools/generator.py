#%%
import pandas as pd
import json

#%%
d = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT89nKmdeL-dW_-M6Ll-qDUKUHvmgVnUY6H8OC6k5OHqLZeBAt3RxBC4eB3sy2FP7WPp9JrLlVKq9Zz/pub?gid=0&single=true&output=csv')

#%%
d.dropna(how='all', inplace=True)
d.f.fillna('face.jpg', inplace=True)
d.fillna('', inplace=True)

#%%
with open('../data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(list(d.to_dict(orient='index').values()),  ensure_ascii=False))

# %%
