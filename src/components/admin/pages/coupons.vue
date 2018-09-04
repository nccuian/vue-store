<template>
  <div>
    <div class="text-right">
			<button class="btn btn-primary" @click="openModal('create', true)">新增優惠券</button>
		</div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th @click="sortByTime">到期日
          <span class="icon" :class="{'inverse': checkTime}">
            <i class=" fas fa-angle-down text-success"></i>
          </span>
        </th>
        <th @click="sortByUse">是否啟用
          <span class="icon" :class="{'inverse': checkUse}">
            <i class=" fas fa-angle-down text-success"></i>
          </span>
        </th>
        <th>編輯</th>
        <th>刪除</th>
      </thead>
      <tbody>
        <tr v-for="coupon in filterdCoupons" :key="coupon.id">
          <td>{{coupon.title}}</td>
          <td>{{coupon.percent}}</td>
          <td>{{coupon.due_date}}</td>
          <td>
            <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
						<span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary" @click="openModal('edit', false, coupon)">編輯</button>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="openModal('delete', false, coupon)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Coupon Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" @keyup.enter="updateCoupon">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-dark text-white">
						<h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
            <div class="form-row">
							<div class="form-group col-md-12">
								<label for="title">標題</label>
								<input type="text" v-model="tempCoupon.title" class="form-control" id="title" 
									placeholder="請輸入優惠券標題">
							</div>
							<div class="form-group col-md-12">
								<label for="code">優惠碼</label>
								<input type="text" v-model="tempCoupon.code" class="form-control" id="code" 
									placeholder="請輸入優惠代碼">
							</div>
              <div class="form-group col-md-12">
								<label for="due_data">到期日</label>
								<input type="date" v-model="tempCoupon.due_date" class="form-control" id="due_data" 
									placeholder="請輸入到期日">
							</div>
              <div class="form-group col-md-12">
								<label for="percent">優惠百分比</label>
								<input type="number" v-model="tempCoupon.percent" class="form-control" id="percent" 
									placeholder="請輸入優惠折扣">
							</div>
              <div class="form-group">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" 
										v-model="tempCoupon.is_enabled"
										:true-value="1"
										:false-value="0"
										id="is_enabled">
									<label class="form-check-label" for="is_enabled">是否啟用</label>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" 
							@click="updateCoupon">更新優惠券</button>
					</div>
				</div>
			</div>
		</div>
    <!-- Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 class="modal-title" id="exampleModalLabel">
							<span>刪除優惠券</span>
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-danger"
							@click="deleteCoupon"
							>確認刪除</button>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      filter: '',
      checkTime: false,
      checkUse: false,
    };
  },
  methods: {
    updateCoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/coupon`;
      let httpMethod = "post";
      if (!this.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/coupon/${
          this.tempCoupon.id
        }`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: this.tempCoupon }).then(response => {
        if (response.data.success) {
          $("#couponModal").modal("hide");
          this.getCoupon();
        } else {
          $("#couponModal").modal("hide");
          this.getCoupon();
          console.log(response);
        }
      });
    },
    getCoupon(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.MYPATH
      }/admin/coupons?page=${page}`;
      this.$http.get(api).then(response => {
        this.coupons = response.data;
      });
    },
    deleteCoupon() {
      const api = `${process.env.APIPATH}/api/${
        process.env.MYPATH
      }/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api).then((response) => {
        if(response.data.success) {
          $('#deleteModal').modal('hide');
          this.getCoupon();
        } else {
          $('#deleteModal').modal('hide');
          this.getCoupon();
          console.log(response);
        }
      })
    },
    openModal(use, isNew, coupon) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, coupon);
        this.isNew = false;
      }
      if (use === "delete") {
        $("#deleteModal").modal("show");
      } else {
        $("#couponModal").modal("show");
      }
    },
    filterSearch(filter) {
      this.filter = filter
    },
    sortByTime() {
      this.filterdCoupons.sort((a, b) => {
        const aTime = Math.floor(new Date(a.due_date) / 1000);
        const bTime = Math.floor(new Date(b.due_date) / 1000);
        if(this.checkTime) {
          return bTime - aTime
        } else {
          return aTime - bTime
        }
      });
      this.checkTime = !this.checkTime
    },
    sortByUse() {
      this.filterdCoupons.sort((a, b) => {
        const aUse = a.is_enabled? 1: 0;
        const bUse = b.is_enabled? 1: 0;
        if(this.checkUse) {
          return aUse - bUse
        } else {
          return bUse - aUse
        }
      });
      this.checkUse = !this.checkUse
    }
  },
  computed: {
    filterdCoupons: {
      get() {
        if(this.filter.trim() == '') {
          return this.coupons.coupons
        }
        return this.coupons.coupons.filter((item) => {
          return item.title.indexOf(this.filter) > -1
        });
      },
      set() {}
    }
  },
  created() {
    this.getCoupon();
    this.$bus.$on('filter-search', this.filterSearch)
  }
};
</script>

<style scoped>
  .icon {
    display: inline-block;
  }
  .icon.inverse {
    transform: rotate(180deg)
  }
</style>
