<template>
  <div>
    <main class="site__main pt-5 lg:pt-0 pb-10 md:pb-20">
      <div class="container mx-auto w-10/12">
        <Title title="100% Anonymous" fontSize="header" onlyTitle="onlyTitle" />
        <Title
          title="Add a company to the list"
          onlyTitle="onlyTitle"
          content="subtitle"
          myStyle="margin-top: 20px; font-family: 'Inter',sans-serif"
        />
        <div class="site__main-row flex flex-col-reverse md:flex-row">
          <div class="site__main-rowOne w-full md:w-1/2">
            <div class="site__main-input mt-3 md:mt-10 md:w-11/12">
              <p
                class="text-xs md:text-sm font-bold"
                style="color: #b1b1b1; font-family: 'Inter', sans-serif"
              >
                Company Name
              </p>
              <input
                :value="newRating.company_name"
                @input="
                  (event) => (newRating.company_name = event.target.value)
                "
                type="text"
                style="height: 61px"
                @focus="nameFocus()"
                class="
                  site__input-field
                  border-none
                  mt-2
                  md:mt-3
                  w-full
                  rounded-md
                  mb-4
                  md:mb-16
                "
              />
              <ul
                style="background: white"
                class="
                  h-20
                  md:h-32
                  overflow-y-scroll
                  rounded-lg
                  -mt-3
                  md:-mt-14
                  mb-2
                  md:mb-4
                  cursor-pointer
                "
                v-if="companyComplation"
              >
                <li
                  v-for="(name, index) in filteredCompanyNames"
                  :key="index"
                  class="shadow-sm py-2 px-4"
                  @click="setCompanyName(name)"
                >
                  {{ name }}
                </li>
              </ul>
              <p
                class="text-xs md:text-sm font-bold"
                style="color: #b1b1b1; font-family: 'Inter', sans-serif"
              >
                Monthly Salary (FCFA)
              </p>
              <input
                v-model="newRating.salary"
                @keypress="onlyNumber"
                type="text"
                style="height: 61px"
                @focus="blurAll()"
                class="
                  site__input-field
                  border-none
                  mt-2
                  md:mt-3
                  w-full
                  rounded-md
                  mb-4
                  md:mb-16
                "
              />
              <p
                class="text-xs md:text-sm font-bold"
                style="color: #b1b1b1; font-family: 'Inter', sans-serif"
              >
                Comments
              </p>
              <textarea
                v-model="newRating.comment"
                @focus="blurAll()"
                type="textarea"
                rows="5"
                style="height: 120px"
                class="resize rounded-md w-full h-full mt-2 md:mt-3 border-none"
              />
              <div class="site__input-btn mt-10 flex flex-col md:flex-row">
                <div class="w-full md:w-1/4">
                  <NuxtLink to="/">
                    <Button
                      showPicture="nothing"
                      name="Cancel"
                      myStyle="background: white; color: #000000"
                    />
                  </NuxtLink>
                </div>
                <div
                  @click="addRating"
                  class="w-full md:w-1/4 ml-0 pt-6 md:pt-0 md:ml-6"
                >
                  <Button
                    myStyle="background: #235365; font-family: 'Inter', sans-serif"
                    name="Add"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="site__main-rowTwo w-full md:w-1/2">
            <div class="site__main-input mt-3 md:mt-10 md:w-11/12">
              <p
                class="text-xs md:text-sm font-bold"
                style="color: #b1b1b1; font-family: 'Inter', sans-serif"
              >
                Job Title
              </p>
              <input
                :value="newRating.job_title"
                @input="(event) => (newRating.job_title = event.target.value)"
                type="text"
                @focus="jobTitleFocus()"
                style="height: 61px"
                class="
                  site__input-field
                  border-none
                  mt-2
                  md:mt-3
                  w-full
                  rounded-md
                  mb-4
                  md:mb-16
                "
              />
              <ul
                style="background: white"
                class="
                  h-20
                  md:h-32
                  overflow-y-scroll
                  rounded-lg
                  -mt-3
                  md:-mt-14
                  mb-2
                  md:mb-4
                  cursor-pointer
                "
                v-if="jobTitleComplation"
              >
                <li
                  v-for="(job, index) in filteredJobTitles"
                  :key="index"
                  class="shadow-sm py-2 px-4"
                  @click="setJobTitle(job)"
                >
                  {{ job }}
                </li>
              </ul>
              <p
                class="text-xs md:text-sm font-bold"
                style="color: #b1b1b1; font-family: 'Inter', sans-serif"
              >
                City
              </p>
              <input
                :value="newRating.city"
                @input="(event) => (newRating.city = event.target.value)"
                type="text"
                style="height: 61px"
                @focus="cityFocus()"
                class="
                  site__input-field
                  border-none
                  mt-2
                  md:mt-3
                  w-full
                  rounded-md
                  mb-4
                  md:mb-16
                "
              />
              <ul
                style="background: white"
                class="
                  h-20
                  md:h-32
                  overflow-y-scroll
                  rounded-lg
                  -mt-3
                  md:-mt-14
                  mb-2
                  md:mb-4
                  cursor-pointer
                "
                v-if="cityComplation"
              >
                <li
                  v-for="(city, index) in filteredCities"
                  :key="index"
                  class="shadow-sm py-2 px-4"
                  @click="setCity(city)"
                >
                  {{ city }}
                </li>
              </ul>
              <div class="site__input w-full">
                <p
                  class="text-xs md:text-sm font-bold"
                  style="color: #b1b1b1; font-family: 'Inter', sans-serif"
                >
                  Seniority
                </p>
                <select
                  @focus="blurAll()"
                  class="
                    mt-2
                    mb-4
                    md:mb-8 md:mt-3
                    form-select
                    appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border-none
                    rounded
                    transition
                    ease-in-out
                    focus:text-gray-700
                    focus:bg-white
                    focus:border-blue-600
                    focus:outline-none
                    text-xs
                    md:text-sm
                    font-bold
                  "
                  style="height: 61px; font-family: 'Inter', sans-serif"
                  v-model="newRating.seniority"
                  aria-label="Default select example"
                >
                  <option
                    v-for="seniority in seniorities"
                    :key="seniority"
                    :value="seniority"
                    style="font-family: 'Inter', sans-serif"
                    class="text-xs md:text-sm"
                  >
                    {{ seniority }}
                  </option>
                </select>
              </div>
              <div class="site__input w-full flex my-3 md:my-0 md:mt-12">
                <p
                  class="text-xs md:text-sm font-bold"
                  style="color: #b1b1b1; font-family: 'Inter', sans-serif"
                >
                  Rate
                </p>
                <StarRating
                  :grade="newRating.rating"
                  :maxStars="5"
                  :hasCounter="true"
                  @changeGrade="setGrade"
                  @blurall="blurAll()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Button from '../components/Button.vue'
export default {
  name: 'AddSalary',
  components: {
    Button,
  },
  layout: 'addSalary',
  data() {
    return {
      starsPicture: require('../assets/star.png'),
      newRating: {
        company_name: '',
        salary: '',
        city: '',
        seniority: 'Senior',
        rating: 0,
        comment: '',
        job_title: '',
      },
      isCompanyNameFocus: false,
      isJobTitleFocus: false,
      isCityFocus: false,
    }
  },
  computed: {
    companies() {
      return this.$store.state.companies.companies
    },
    jobtitles() {
      return this.$store.state.jobtitles.jobtitles
    },
    cities() {
      return this.$store.state.cities.cities
    },
    seniorities() {
      return this.$store.state.seniorities.seniorities
    },
    companyNames() {
      return this.companies.map((elem) => elem.name)
    },
    filteredCompanyNames() {
      if (this.newRating.company_name === '') {
        return []
      } else {
        return this.companyNames.filter((elem) => {
          return !elem
            .toLowerCase()
            .indexOf(this.newRating.company_name.toLowerCase())
        })
      }
    },
    filteredJobTitles() {
      if (this.newRating.job_title === '') {
        return []
      } else {
        return this.jobtitles.filter((elem) => {
          return !elem
            .toLowerCase()
            .indexOf(this.newRating.job_title.toLowerCase())
        })
      }
    },
    filteredCities() {
      if (this.newRating.city === '') {
        return []
      } else {
        return this.cities.filter((elem) => {
          return !elem.toLowerCase().indexOf(this.newRating.city.toLowerCase())
        })
      }
    },
    companyComplation() {
      return this.filteredCompanyNames.length > 0 && this.isCompanyNameFocus
    },
    jobTitleComplation() {
      return this.filteredJobTitles.length > 0 && this.isJobTitleFocus
    },
    cityComplation() {
      return this.filteredCities.length > 0 && this.isCityFocus
    },
  },
  async created() {
    try {
      await this.fetchCompanies()
      await this.fetchJobtitles()
      await this.fetchCities()
      await this.fetchSeniorities()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    goToList() {
      this.$router.push('/')
    },
    setCompanyName(name) {
      this.newRating.company_name = name
      this.isCompanyNameFocus = false
    },
    setJobTitle(job) {
      this.newRating.job_title = job
      this.isJobTitleFocus = false
    },
    setCity(city) {
      this.newRating.city = city
      this.isCityFocus = false
    },
    async fetchCompanies() {
      await this.$store.dispatch('getCompanies')
    },
    async fetchJobtitles() {
      await this.$store.dispatch('getJobtitles')
    },
    async fetchCities() {
      await this.$store.dispatch('getCities')
    },
    async fetchSeniorities() {
      await this.$store.dispatch('getSeniorities')
    },
    setGrade(value) {
      this.newRating.rating = value
    },
    blurAll() {
      this.isJobTitleFocus = false
      this.isCompanyNameFocus = false
      this.isCityFocus = false
    },
    nameFocus() {
      this.blurAll()
      this.isCompanyNameFocus = true
    },
    jobTitleFocus() {
      this.blurAll()
      this.isJobTitleFocus = true
    },
    cityFocus() {
      this.blurAll()
      this.isCityFocus = true
    },
    addRating() {
      if (this.newRating) {
        this.$store.dispatch('postRating', this.newRating)
        this.$router.push('/')
      }
    },
    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault()
      }
    },
  },
}
</script>
