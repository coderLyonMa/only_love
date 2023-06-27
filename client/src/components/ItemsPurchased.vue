<template>
  <div class="container">
    <div class="row">
          <div class="col-sm-10">
        <h1>清单</h1>
        <hr><br><br>
        <div>
        <b-form-select v-model="addItemForm.item_for" :options="options"
        @change="getItemsPurchasedToday">
        </b-form-select>
        </div>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.item-modal>添加商品</button>
        <br><br>
        总计： <b>{{ total / 10000 }}</b>元
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">名称</th>
                <th scope="col">单位</th>
              <th scope="col">数量</th>
              <th scope="col">单价(元)</th>
              <th scope="col">总价(元)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.count / 100 }}</td>
              <td>{{ item.price / 100 }}</td>
              <td>{{ (item.count * item.price) / 10000 }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm">修改</button>
                  <button type="button" class="btn btn-danger btn-sm"
                  @click="onDeleteItem(item.id)">
                  删除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

<b-modal ref="addItemsPurchasedModal"
         id="item-modal"
         title="添加一个商品"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">

    <b-form-group id="form-name-group"
                label="商品名称:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addItemForm.name"
                    required
                    placeholder="输入商品名称">
      </b-form-input>
    </b-form-group>

    <b-form-group id="form-unit-group"
                  label="单位:"
                  label-for="form-unit-input">
        <b-form-input id="form-unit-input"
                      type="text"
                      v-model="addItemForm.unit"
                      required
                      placeholder="输入商品单位">
        </b-form-input>
    </b-form-group>

    <b-form-group id="form-count-group"
                  label="数量:"
                  label-for="form-count-input">
        <b-form-input id="form-count-input"
                      type="text"
                      v-model="addItemForm.count"
                      required
                      placeholder="输入商品数量">
        </b-form-input>
    </b-form-group>

    <b-form-group id="form-price-group"
                  label="单价:"
                  label-for="form-price-input">
        <b-form-input id="form-price-input"
                      type="text"
                      v-model="addItemForm.price"
                      required
                      placeholder="输入商品单价">
        </b-form-input>
    </b-form-group>

    <b-form-group id="form-item-for-group"
                  label="用于:"
                  label-for="form-item-for-input">
        <b-form-select v-model="addItemForm.item_for" :options="options"
        required>
        </b-form-select>
    </b-form-group>

    <b-button type="submit" variant="primary">确定添加</b-button>
    <b-button type="reset" variant="danger">重置</b-button>
  </b-form>
  </b-modal>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

// const qs = require('qs');

export default {
  name: 'ItemsComponent',
  data() {
    return {
      items: [],
      total: 0,
      addItemForm: {
        item_for: 1,
        name: '',
        unit: '',
        count: 0,
        price: 0.0,
      },
      options: [
        { value: 1, text: '月子餐' },
        { value: 2, text: '员工餐' },
      ],
    };
  },
  methods: {
    getItemsPurchasedToday() {
      console.log('hello');
      const path = 'http://54.251.25.117:5000/items-today';
      axios.get(path, {
        data: {},
        params: {
          items_for: this.addItemForm.item_for,
        },
      })
        .then((res) => {
          this.items = res.data.items;
          this.total = res.data.total;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addItemPurchased(payload) {
      const path = 'http://54.251.25.117:5000/add-items-purchased';
      axios.post(path, payload)
        .then(() => {
          this.getItemsPurchasedToday();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getItemsPurchasedToday();
        });
    },
    initForm() {
      this.addItemForm.name = '';
      this.addItemForm.unit = '';
      this.addItemForm.count = 0.0;
      this.addItemForm.price = 0.0;
    },
    onDeleteItem(itemID) {
      const path = `http://54.251.25.117:5000/delete-item/${itemID}`;
      axios.delete(path)
        .then(() => {
          this.getItemsPurchasedToday();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getItemsPurchasedToday();
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addItemsPurchasedModal.hide();

      const payload = {
        name: this.addItemForm.name,
        unit: this.addItemForm.unit,
        count: this.addItemForm.count,
        price: this.addItemForm.price,
        item_for: this.addItemForm.item_for,
      };

      this.addItemPurchased(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addItemsPurchasedModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getItemsPurchasedToday();
  },
};
</script>
