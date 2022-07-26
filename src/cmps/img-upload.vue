<template>
    <section class="img-upload">
        <label v-if="!isLoading">
            <!-- <Upload-icon :class="{ drag: isDragover }" /> -->
            <div>
                <label for="files" class="uploader">Computer</label>
                <input @input="onUploadImg" id="files" style="visibility:hidden;position: absolute;"
                    @change="handleFile" type="file">

                <!-- <label for="addLink">Attach a link</label>
                <input id="addLink" class="attachment-add-link-input" v-focus type="text"
                    placeholder="Paste any link here…" /> -->
            </div>
        </label>
        <hr>
        <label @click.stop.prevent @drop.prevent="handleFile" @dragover.prevent="isDragover = true"
            @dragleave="isDragover = false" :class="{ drag: isDragover }">
            <p>Tip: You can drag and drop files and links onto cards to upload them.</p>
            <input type="file" @drop.prevent="handleFile" hidden>
        </label>

    </section>
</template>

<script>
import { uploadImg } from '../services/img-upload.service';
// import UploadIcon from '../assets/svgs/upload-icon.vue';

export default {
    name: 'img-upload',
    components: {
        // UploadIcon
    },
    data() {
        return {
            isLoading: false,
            isDragover: false
        }
    },
    methods: {
        handleFile(ev) {
            var file
            if (ev.type === "change") file = ev.target.files[0]
            else if (ev.type === "drop") file = ev.dataTransfer.files[0]
            this.onUploadFile(file)
        },
        async onUploadFile(file) {

            this.isLoading = true
            const res = await uploadImg(file)
            console.log('res', res)
            this.isLoading = false
            this.isDragover = false
            this.$emit('onImgUpload', res)
        }
    },
}
</script>

<style>
.drag {
    color: #6cb1ed;
}
</style>