<template>
  <div>
		<Loading :active.sync="isLoading"></Loading>
    <div class="text-right">
			<button class="btn btn-primary" @click="openModal('create', true)">新增商品</button>
		</div>
		<table class="table mt-4">
			<thead>
				<tr>
					<th width="120">分類</th>
					<th>產品名稱</th>
					<th width="120">特價</th>
					<th width="120">售價</th>
					<th width="100">是否啟用</th>
					<th width="80">編輯</th>
					<th width="80">刪除</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in filteredProducts" :key="item.id">
					<td>{{ item.category }}</td>
					<td>{{ item.title }}</td>
					<td>
						<span v-if="item.origin_price">{{ item.origin_price | currencyFilter }}</span>
						<span v-else>無</span>
					</td>
					<td>{{ item.price | currencyFilter }}</td>
					<td>
						<span v-if="item.is_enabled === 1" class="text-success">啟用</span>
						<span v-else class="text-danger">未啟用</span>
					</td>
					<td>
						<button class="btn btn-sm btn-outline-primary" @click="openModal('edit', false, item)">編輯</button>
					</td>
					<td>
						<button class="btn btn-sm btn-outline-primary" @click="openModal('delete', false, item)">刪除</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- create product modal -->
		<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-dark text-white">
						<h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-sm-4">
								<div class="form-group">
									<label for="image">輸入圖片網址</label>
									<input type="text" v-model="tempProduct.imageUrl" class="form-control" id="image" placeholder="請輸入圖片連結">
								</div>
								<div class="form-group">
									<label for="customfile">或 上傳圖片
										<i class="fas fa-spinner fa-spin" v-if="status.fileUpLoading"></i>
									</label>
									<input type="file" id="customfile" class="form-control" ref="files" @change="uploadFile">
								</div>
								<img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              		class="img-fluid" :src="tempProduct.imageUrl" alt="">
							</div>
							<div class="col-sm-8">
								<div class="form-group">
									<label for="title">標題</label>
									<input type="text" v-model="tempProduct.title" id="title" class="form-control" placeholder="請輸入標題">
								</div>

								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="category">分類</label>
										<input type="text" v-model="tempProduct.category" class="form-control" id="category" 
											placeholder="請輸入分類">
									</div>
									<div class="form-group col-md-6">
										<label for="unit">單位</label>
										<input type="text" v-model="tempProduct.unit" class="form-control" id="unit" 
											placeholder="請輸入單位">
									</div>
								</div>
								<div class="form-row">
									<div class="form-group col-md-6">
										<label for="origin_price">特價</label>
										<input type="number" v-model="tempProduct.origin_price" class="form-control" id="origin_price" 
											placeholder="請輸入原價">
									</div>
									<div class="form-group col-md-6">
										<label for="price">售價</label>
										<input type="number" v-model="tempProduct.price" class="form-control" id="price" 
											placeholder="請輸入售價">
									</div>
								</div>
								<hr>
								<div class="form-group">
									<label for="description">產品描述</label>
									<textarea type="text" class="form-control" id="description"
										v-model="tempProduct.description"
										placeholder="請輸入產品描述"></textarea>
								</div>
								<div class="form-group">
									<label for="content">說明內容</label>
									<textarea type="text" class="form-control" id="content"
										v-model="tempProduct.content"
										placeholder="請輸入產品說明內容"></textarea>
								</div>
								<div class="form-group">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" 
											v-model="tempProduct.is_enabled"
											:true-value="1"
											:false-value="0"
											id="is_enabled">
										<label class="form-check-label" for="is_enabled">是否啟用</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" 
							@click="updateProduct">確認</button>
					</div>
				</div>
			</div>
		</div>
		<!-- delete product modal -->
		<div class="modal fade" id="deleteProductModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 class="modal-title" id="exampleModalLabel">
							<span>刪除產品</span>
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-danger"
							@click="deleteProduct"
							>確認刪除</button>
					</div>
				</div>
			</div>
		</div>
		<Pagination :pagination="pagination" @emitGetData="getData($event)"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../../pagination';

export default {
	components: {
		Pagination,
	},
  data() {
    return {
			products: [],
			pagination: {},
			tempProduct: {},
			isNew: false,
			isLoading: false,
			isReverse: false,
			status: {
				fileUpLoading: false,
			},
			filter: '',
			sort: '',
    };
  },
  methods: {
    getData(page = 1) {
			const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/products?page=${page}`;
			this.isLoading = true;
      this.$http.get(api).then(response => {
				console.log(response);
				this.products = response.data.products;
				this.pagination = response.data.pagination;
				this.isLoading = false;
      });
		},
		openModal(use, isNew, item,) {
			if(isNew) {
				this.tempProduct = {};
				this.isNew = true;
			} else {
				this.tempProduct = Object.assign({}, item);
				this.isNew = false;
			}
			if(use === 'delete'){
				$('#deleteProductModal').modal('show');
			} else {
				$('#productModal').modal('show');
			}
		},
		updateProduct() {
			let api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/product`;
			let httpMethod = 'post';
			if(!this.isNew) {
				api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/product/${this.tempProduct.id}`;
				httpMethod = 'put';
			}
      this.$http[httpMethod](api, {data: this.tempProduct}).then(response => {
        if(response.data.success) {
					$('#productModal').modal('hide');
					this.getData();
				} else {
					$('#productModal').modal('hide');
					this.getData();
					console.log(response);
				}
      });
		},
		deleteProduct() {
			const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/product/${this.tempProduct.id}`;
			this.$http.delete(api).then(response => {
				if(response.data.success) {
					$('#deleteProductModal').modal('hide');
					this.getData();
				} else {
					$('#deleteProductModal').modal('hide');
					this.getData();
					console.log('something wrong', response);
				}
			})
		},
		uploadFile() {
			const file = this.$refs.files.files[0];
			const formData = new FormData();
			formData.append('file-to-upload', file);
			const url = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/upload`;
			this.status.fileUpLoading = true;
			this.$http.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(response => {
				this.status.fileUpLoading = false;
				if(response.data.success) {
					this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl);
				} else {
					this.$bus.$emit('message-push', response.data.message, 'danger');
				}
			})
		},
		filterSearch(filter) {
			this.filter = filter;
		},
		catchSort(sort) {
			this.sort = sort;
			this.isReverse = !this.isReverse;
		}
	},
	computed: {
		filteredProducts() {
			if(this.filter.trim() == '') {
				return this.products
			} else {
				return this.products.filter((item) => {
					return item.title.indexOf(this.filter) > -1
				});
			}
		},
	},
  created() {
		this.getData();
		this.$bus.$on('filter-search', this.filterSearch);
  }
};
</script>
